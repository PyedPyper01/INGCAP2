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

@api_router.post("/send-booking")
async def send_booking_email(booking: BookingRequest):
    try:
        # Format the appointment date
        appointment_date = datetime.strptime(booking.date, '%Y-%m-%d').strftime('%A, %d %B %Y')
        
        # Create email content
        subject = f"Consultation Booking Request - {booking.name}"
        
        # HTML email body
        html_body = f"""
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
                
                <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
                    <p>This booking request was sent from the Ingenious Capital website.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create plain text version
        text_body = f"""
        New Consultation Booking Request
        
        CLIENT DETAILS:
        Name: {booking.name}
        Email: {booking.email}
        Phone: {booking.phone}
        Company: {booking.company or 'Not specified'}
        
        REQUESTED APPOINTMENT:
        Date: {appointment_date}
        Time: {booking.time}
        
        Please confirm this appointment or suggest an alternative if this time is not available.
        
        This booking request was sent from the Ingenious Capital website.
        """
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = 'noreply@ingcap.co.uk'
        msg['To'] = 'appointment@ingcap.co.uk'
        
        # Attach both plain text and HTML versions
        text_part = MIMEText(text_body, 'plain', 'utf-8')
        html_part = MIMEText(html_body, 'html', 'utf-8')
        
        msg.attach(text_part)
        msg.attach(html_part)
        
        # Send email using Gmail SMTP (you can change this to your preferred provider)
        # For now, we'll use a simple SMTP setup
        # You'll need to configure SMTP settings in your environment
        
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if not smtp_user or not smtp_password:
            # For now, let's store the booking in the database as a fallback
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
        
        # Send the email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        text = msg.as_string()
        server.sendmail(smtp_user, 'appointment@ingcap.co.uk', text)
        server.quit()
        
        # Also store in database for record keeping
        booking_record = {
            **booking.dict(),
            'id': str(uuid.uuid4()),
            'timestamp': datetime.utcnow(),
            'status': 'sent'
        }
        await db.bookings.insert_one(booking_record)
        
        return {
            "success": True, 
            "message": "Booking request sent successfully. You will be contacted shortly to confirm your appointment."
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
