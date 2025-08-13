import requests
import sys
from datetime import datetime
import json

class IngeniousCapitalAPITester:
    def __init__(self, base_url="https://f2ac2f5d-09e9-44b7-94d9-607506d31781.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating a status check
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if not success:
            return False
            
        # Test getting status checks
        success, _ = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        return success

    def test_booking_endpoints(self):
        """Test booking-related endpoints"""
        # Test getting all bookings
        success, _ = self.run_test(
            "Get All Bookings",
            "GET",
            "bookings",
            200
        )
        
        if not success:
            return False
            
        # Test getting booked slots for a specific date
        test_date = "2025-01-20"
        success, _ = self.run_test(
            f"Get Booked Slots for {test_date}",
            "GET",
            f"booked-slots/{test_date}",
            200
        )
        
        if not success:
            return False
            
        # Test creating a booking
        booking_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+44 7700 900123",
            "company": "Test Company Ltd",
            "date": "2025-01-25",
            "time": "10:00"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "send-booking",
            200,
            data=booking_data
        )
        
        return success

    def test_email_endpoint(self):
        """Test email configuration endpoint"""
        success, _ = self.run_test(
            "Test Email Connection",
            "GET",
            "test-email",
            200
        )
        return success

def main():
    print("🚀 Starting Ingenious Capital Backend API Tests")
    print("=" * 60)
    
    # Setup
    tester = IngeniousCapitalAPITester()
    
    # Run all tests
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Status Endpoints", tester.test_status_endpoints),
        ("Booking Endpoints", tester.test_booking_endpoints),
        ("Email Configuration", tester.test_email_endpoint)
    ]
    
    for test_name, test_func in tests:
        print(f"\n📋 Running {test_name} Tests...")
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Backend is working correctly.")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed. Check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())