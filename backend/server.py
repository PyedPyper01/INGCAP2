from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class BookingRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: str = ""
    date: str
    time: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.get("/booked-slots/{date}")
async def get_booked_slots(date: str):
    """Get all booked time slots for a specific date"""
    try:
        # Find all bookings for the given date
        bookings = await db.bookings.find({
            "date": date,
            "status": {"$in": ["sent", "confirmed"]}
        }).to_list(100)
        
        # Extract just the times
        booked_times = [booking["time"] for booking in bookings]
        
        return {"booked_times": booked_times}
        
    except Exception as e:
        logger.error(f"Error fetching booked slots: {str(e)}")
        return {"booked_times": []}

@api_router.post("/send-booking")
async def send_booking_email(booking: BookingRequest):
    try:
        # Format the appointment date
        appointment_date = datetime.strptime(booking.date, '%Y-%m-%d').strftime('%A, %d %B %Y')
        
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if not smtp_user or not smtp_password:
            # Store the booking in the database as a fallback
            booking_record = {
                **booking.dict(),
                'id': str(uuid.uuid4()),
                'timestamp': datetime.utcnow(),
                'status': 'pending'
            }
            await db.bookings.insert_one(booking_record)
            
            return {
                "success": True, 
                "message": "Booking request received. You will be contacted shortly to confirm your appointment.",
                "fallback": True
            }
        
        # Connect to SMTP server with proper error handling
        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(smtp_user, smtp_password)
        except smtplib.SMTPAuthenticationError as auth_error:
            logger.error(f"SMTP Authentication failed: {auth_error}")
            # Store in database and return success message to user
            booking_record = {
                **booking.dict(),
                'id': str(uuid.uuid4()),
                'timestamp': datetime.utcnow(),
                'status': 'auth_error',
                'error': str(auth_error)
            }
            await db.bookings.insert_one(booking_record)
            
            return {
                "success": True, 
                "message": "Booking request received and saved. You will be contacted shortly to confirm your appointment.",
                "fallback": True
            }
        except Exception as smtp_error:
            logger.error(f"SMTP connection failed: {smtp_error}")
            # Store in database and return success message to user
            booking_record = {
                **booking.dict(),
                'id': str(uuid.uuid4()),
                'timestamp': datetime.utcnow(),
                'status': 'smtp_error',
                'error': str(smtp_error)
            }
            await db.bookings.insert_one(booking_record)
            
            return {
                "success": True, 
                "message": "Booking request received and saved. You will be contacted shortly to confirm your appointment.",
                "fallback": True
            }
        
        # EMAIL 1: Send to business (appointment@ingcap.co.uk)
        business_subject = f"New Consultation Booking Request - {booking.name}"
        business_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2d5a5a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
                    New Consultation Booking Request
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d5a5a; margin-top: 0;">Client Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
                            <td style="padding: 8px 0;">{booking.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                            <td style="padding: 8px 0;"><a href="mailto:{booking.email}" style="color: #0066cc;">{booking.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
                            <td style="padding: 8px 0;"><a href="tel:{booking.phone}" style="color: #0066cc;">{booking.phone}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Company:</td>
                            <td style="padding: 8px 0;">{booking.company or 'Not specified'}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="background-color: #e6f3f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d5a5a; margin-top: 0;">Requested Appointment:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Date:</td>
                            <td style="padding: 8px 0; font-size: 16px; color: #2d5a5a;"><strong>{appointment_date}</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Time:</td>
                            <td style="padding: 8px 0; font-size: 16px; color: #2d5a5a;"><strong>{booking.time}</strong></td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                        <strong>Next Steps:</strong> Please confirm this appointment or suggest an alternative time by replying to this email or calling the client directly.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        business_msg = MIMEMultipart('alternative')
        business_msg['Subject'] = business_subject
        business_msg['From'] = smtp_user
        business_msg['To'] = 'appointment@ingcap.co.uk'
        business_msg.attach(MIMEText(business_html, 'html', 'utf-8'))
        
        # EMAIL 2: Send confirmation to customer
        customer_subject = f"Booking Confirmation - Ingenious Capital Consultation"
        customer_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2d5a5a; margin-bottom: 10px;">Ingenious Capital</h1>
                    <p style="color: #f97316; font-size: 18px; margin: 0;">Investment Consultation Booking</p>
                </div>
                
                <div style="background-color: #e6f3f3; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2d5a5a;">
                    <h2 style="color: #2d5a5a; margin-top: 0;">Thank you for your booking request!</h2>
                    <p style="margin: 0; font-size: 16px;">
                        Dear {booking.name}, we have received your consultation booking request and will contact you shortly to confirm your appointment.
                    </p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d5a5a; margin-top: 0;">Your Booking Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Requested Date:</td>
                            <td style="padding: 8px 0; font-size: 16px; color: #2d5a5a;"><strong>{appointment_date}</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Requested Time:</td>
                            <td style="padding: 8px 0; font-size: 16px; color: #2d5a5a;"><strong>{booking.time}</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Contact Email:</td>
                            <td style="padding: 8px 0;">{booking.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #666;">Contact Phone:</td>
                            <td style="padding: 8px 0;">{booking.phone}</td>
                        </tr>
                        {f'<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Company:</td><td style="padding: 8px 0;">{booking.company}</td></tr>' if booking.company else ''}
                    </table>
                </div>
                
                <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeaa7;">
                    <h3 style="color: #856404; margin-top: 0;">What happens next?</h3>
                    <ul style="color: #856404; margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Our team will review your booking request</li>
                        <li style="margin-bottom: 8px;">We will contact you within 24 hours to confirm your appointment</li>
                        <li style="margin-bottom: 8px;">If your requested time is unavailable, we will suggest alternative times</li>
                        <li>You will receive a calendar invitation once confirmed</li>
                    </ul>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <h3 style="color: #2d5a5a;">Contact Information:</h3>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:appointment@ingcap.co.uk" style="color: #0066cc;">appointment@ingcap.co.uk</a></p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:02039165288" style="color: #0066cc;">020 3916 5288</a></p>
                    <p style="margin: 5px 0;"><strong>Address:</strong> 1 Canada Square, Canary Wharf, London E14 5AA</p>
                </div>
                
                <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
                    <p>Thank you for choosing Ingenious Capital for your investment consultation needs.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        customer_msg = MIMEMultipart('alternative')
        customer_msg['Subject'] = customer_subject
        customer_msg['From'] = smtp_user
        customer_msg['To'] = booking.email
        customer_msg.attach(MIMEText(customer_html, 'html', 'utf-8'))
        
        # Send both emails
        server.sendmail(smtp_user, 'appointment@ingcap.co.uk', business_msg.as_string())
        server.sendmail(smtp_user, booking.email, customer_msg.as_string())
        server.quit()
        
        # Store in database for record keeping
        booking_record = {
            **booking.dict(),
            'id': str(uuid.uuid4()),
            'timestamp': datetime.utcnow(),
            'status': 'sent',
            'emails_sent': ['appointment@ingcap.co.uk', booking.email]
        }
        await db.bookings.insert_one(booking_record)
        
        return {
            "success": True, 
            "message": "Booking request sent successfully! You will receive a confirmation email shortly and we will contact you within 24 hours to confirm your appointment."
        }
        
    except Exception as e:
        logger.error(f"Error sending booking email: {str(e)}")
        
        # Store in database as fallback
        try:
            booking_record = {
                **booking.dict(),
                'id': str(uuid.uuid4()),
                'timestamp': datetime.utcnow(),
                'status': 'error',
                'error': str(e)
            }
            await db.bookings.insert_one(booking_record)
        except Exception as db_error:
            logger.error(f"Error storing booking in database: {str(db_error)}")
        
        return {
            "success": True, 
            "message": "Booking request received. You will be contacted shortly to confirm your appointment.",
            "fallback": True
        }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
