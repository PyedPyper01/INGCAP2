#!/bin/bash

# Simple booking notification script
# Run this periodically to check for new bookings

echo "=== NEW BOOKING CHECKER ==="
echo "Checking for bookings received today..."

# Get today's date
TODAY=$(date +%Y-%m-%d)

# Check for new bookings
curl -s "http://localhost:8001/api/bookings" | python3 -c "
import sys, json
from datetime import datetime

data = json.load(sys.stdin)
today = '$TODAY'

print('📊 BOOKING SUMMARY:')
print(f'Total bookings: {len(data[\"bookings\"])}')
print()

print('🆕 RECENT BOOKINGS (Last 5):')
for booking in data['bookings'][:5]:
    status_emoji = '✅' if booking['status'] == 'saved' else '❌'
    print(f'{status_emoji} {booking[\"name\"]} - {booking[\"date\"]} at {booking[\"time\"]}')
    print(f'   📧 {booking[\"email\"]} | 📞 {booking[\"phone\"]}')
    print(f'   Company: {booking.get(\"company\", \"N/A\")}')
    print()

print('💡 TIP: You can email these customers manually from appointment@ingcap.co.uk')
print('📧 Email templates are available in the booking confirmation system.')
"

echo ""
echo "To run this checker periodically, you can:"
echo "1. Run: chmod +x /app/check-bookings.sh"
echo "2. Add to crontab: */30 * * * * /app/check-bookings.sh"