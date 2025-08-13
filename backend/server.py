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

@api_router.get("/bookings")
async def get_all_bookings():
    """Get all booking requests for admin review"""
    try:
        bookings = await db.bookings.find().sort("timestamp", -1).to_list(100)
        # Convert ObjectId to string and format timestamps
        formatted_bookings = []
        for booking in bookings:
            if '_id' in booking:
                booking['_id'] = str(booking['_id'])
            if 'timestamp' in booking and isinstance(booking['timestamp'], datetime):
                booking['formatted_date'] = booking['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
            formatted_bookings.append(booking)
        return {"bookings": formatted_bookings}
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        return {"bookings": [], "error": str(e)}

@api_router.get("/test-email")
async def test_email_connection():
    """Test SMTP connection and authentication"""
    smtp_server = os.environ.get('SMTP_SERVER', '')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    use_ssl = os.environ.get('SMTP_USE_SSL', 'false').lower() == 'true'
    
    if not smtp_user or not smtp_password:
        return {"error": "SMTP credentials not configured"}
    
    try:
        if use_ssl and smtp_port == 465:
            # Use SSL connection for port 465
            server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        else:
            # Use regular SMTP with STARTTLS for port 587
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
        
        server.login(smtp_user, smtp_password)
        server.quit()
        return {"success": True, "message": f"Successfully connected to {smtp_server} as {smtp_user} (SSL: {use_ssl})"}
    except smtplib.SMTPAuthenticationError as e:
        return {"error": f"Authentication failed - check credentials: {str(e)}"}
    except Exception as e:
        return {"error": f"Connection failed: {str(e)}"}

@api_router.get("/booked-slots/{date}")
async def get_booked_slots(date: str):
    """Get all booked time slots for a specific date"""
    try:
        # Find all bookings for the given date
        bookings = await db.bookings.find({
            "date": date
        }).to_list(100)
        
        # Extract just the times
        booked_times = [booking["time"] for booking in bookings if "time" in booking]
        
        return {"booked_times": booked_times, "date": date, "total_bookings": len(booked_times)}
        
    except Exception as e:
        logger.error(f"Error fetching booked slots: {str(e)}")
        return {"booked_times": [], "error": str(e)}

@api_router.post("/send-booking")
async def send_booking_email(booking: BookingRequest):
    try:
        # Always save to database first
        booking_record = {
            **booking.dict(),
            'id': str(uuid.uuid4()),
            'timestamp': datetime.utcnow(),
            'status': 'saved'
        }
        
        # Insert into database
        result = await db.bookings.insert_one(booking_record)
        
        # Format the appointment date for display
        try:
            appointment_date = datetime.strptime(booking.date, '%Y-%m-%d').strftime('%A, %d %B %Y')
        except:
            appointment_date = booking.date
        
        # Try to send emails (but don't fail if this doesn't work)
        email_sent = False
        smtp_server = os.environ.get('SMTP_SERVER', '')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if smtp_user and smtp_password and 'temp_password_for_testing' not in smtp_password and 'YOUR_16_CHAR_APP_PASSWORD_HERE' not in smtp_password:
            try:
                # Connect with SSL support
                use_ssl = os.environ.get('SMTP_USE_SSL', 'false').lower() == 'true'
                
                if use_ssl and smtp_port == 465:
                    server = smtplib.SMTP_SSL(smtp_server, smtp_port)
                else:
                    server = smtplib.SMTP(smtp_server, smtp_port)
                    server.starttls()
                    
                server.login(smtp_user, smtp_password)
                
                # EMAIL 1: Send notification to business
                business_subject = f"New Booking: {booking.name} - {appointment_date} at {booking.time}"
                business_body = f"""
New consultation booking received:

CLIENT DETAILS:
Name: {booking.name}
Email: {booking.email}  
Phone: {booking.phone}
Company: {booking.company or 'Not specified'}

APPOINTMENT REQUEST:
Date: {appointment_date}
Time: {booking.time}

Please contact the client to confirm this appointment.

You can reply directly to this email or call them at {booking.phone}.
                """
                
                business_msg = MIMEText(business_body)
                business_msg['Subject'] = business_subject
                business_msg['From'] = smtp_user
                business_msg['To'] = 'appointmentsingcap@gmail.com'
                business_msg['Reply-To'] = booking.email
                
                server.send_message(business_msg)
                
                # EMAIL 2: Send confirmation to customer
                customer_subject = f"Booking Confirmation - Ingenious Capital Consultation"
                customer_body = f"""
Dear {booking.name},

Thank you for requesting a consultation with Ingenious Capital!

BOOKING DETAILS:
Date: {appointment_date}
Time: {booking.time}
Your Email: {booking.email}
Your Phone: {booking.phone}
{f'Company: {booking.company}' if booking.company else ''}

WHAT HAPPENS NEXT:
• Our team will review your booking request
• We will contact you within 24 hours to confirm your appointment
• If your requested time is unavailable, we will suggest alternatives
• You will receive a calendar invitation once confirmed

CONTACT INFORMATION:
Email: appointment@ingcap.co.uk
Phone: 020 3916 5288
Address: 1 Canada Square, Canary Wharf, London E14 5AA

Thank you for choosing Ingenious Capital for your investment consultation needs.

Best regards,
The Ingenious Capital Team
                """
                
                customer_msg = MIMEText(customer_body)
                customer_msg['Subject'] = customer_subject
                customer_msg['From'] = smtp_user
                customer_msg['To'] = booking.email
                customer_msg['Reply-To'] = 'appointment@ingcap.co.uk'
                
                server.send_message(customer_msg)
                server.quit()
                
                # Update status to show both emails sent
                await db.bookings.update_one(
                    {"_id": result.inserted_id},
                    {"$set": {
                        "status": "emails_sent", 
                        "emails_sent_to": ['appointment@ingcap.co.uk', booking.email],
                        "email_sent_time": datetime.utcnow()
                    }}
                )
                email_sent = True
                
            except Exception as e:
                logger.error(f"Email sending failed: {str(e)}")
                await db.bookings.update_one(
                    {"_id": result.inserted_id},
                    {"$set": {"status": "email_failed", "email_error": str(e)}}
                )
        
        return {
            "success": True, 
            "message": "Booking request received successfully! " + (
                "Confirmation emails have been sent to both you and our team. We will contact you within 24 hours to confirm your appointment." 
                if email_sent 
                else "You will be contacted shortly to confirm your appointment."
            ),
            "booking_id": str(result.inserted_id),
            "emails_sent": email_sent
        }
        
    except Exception as e:
        logger.error(f"Error processing booking: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Booking failed: {str(e)}")

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