import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Users, 
  Clock, 
  Award, 
  BarChart3,
  CheckCircle,
  PieChart,
  Target,
  Globe,
  Zap,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Building,
  Briefcase,
  LineChart,
  Layers,
  Lock,
  TrendingDown,
  Calendar,
  DollarSign,
  Activity,
  Eye,
  Percent
} from 'lucide-react';

// Booking Calendar Component (moved outside to prevent re-render issues)
const BookingCalendar = ({ 
  showBookingCalendar, 
  setShowBookingCalendar, 
  selectedDate, 
  setSelectedDate, 
  selectedTime, 
  setSelectedTime, 
  bookingForm, 
  setBookingForm 
}) => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Blocked times/dates (you can modify these)
  const blockedDates = [
    '2025-01-15', '2025-01-16', '2025-01-22', '2025-01-23'
  ];
  
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Fetch booked slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchBookedSlots = async (date) => {
    setLoadingSlots(true);
    try {
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env?.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/booked-slots/${date}`);
      
      if (response.ok) {
        const data = await response.json();
        setBookedSlots(data.booked_times || []);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      setBookedSlots([]);
    }
    setLoadingSlots(false);
  };

  // Get available time slots (excluding booked ones)
  const getAvailableTimeSlots = () => {
    return timeSlots.filter(time => !bookedSlots.includes(time));
  };

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends and blocked dates
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const dateStr = date.toISOString().split('T')[0];
        if (!blockedDates.includes(dateStr)) {
          dates.push({
            date: dateStr,
            display: date.toLocaleDateString('en-GB', { 
              weekday: 'short', 
              day: 'numeric', 
              month: 'short' 
            })
          });
        }
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert('Please fill in all required fields and select date/time');
      return;
    }
    
    try {
      // Create booking payload
      const bookingData = {
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        company: bookingForm.company || '',
        date: selectedDate,
        time: selectedTime
      };
      
      // Get backend URL from environment
      const backendUrl = import.meta.env?.REACT_APP_BACKEND_URL || process.env?.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Send booking request to backend
      const response = await fetch(`${backendUrl}/api/send-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Reset and close
      setSelectedDate('');
      setSelectedTime('');
      setBookingForm({ name: '', email: '', phone: '', company: '' });
      setShowBookingCalendar(false);
      
      // Show success message
      alert(result.message || 'Booking request sent successfully! You will be contacted shortly to confirm your appointment.');
      
    } catch (error) {
      console.error('Error sending booking request:', error);
      
      // Fallback to mailto if API fails
      const bookingDetails = `Consultation Booking Request:

CLIENT DETAILS:
Name: ${bookingForm.name}
Email: ${bookingForm.email}
Phone: ${bookingForm.phone}
Company: ${bookingForm.company || 'N/A'}

APPOINTMENT DETAILS:
Date: ${new Date(selectedDate).toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}
Time: ${selectedTime}

Please confirm this appointment or suggest an alternative if this time is not available.

Best regards,
Ingenious Capital Booking System`;
      
      const mailtoLink = `mailto:appointment@ingcap.co.uk?subject=Consultation Booking Request - ${bookingForm.name}&body=${encodeURIComponent(bookingDetails)}`;
      window.location.href = mailtoLink;
      
      // Reset and close
      setSelectedDate('');
      setSelectedTime('');
      setBookingForm({ name: '', email: '', phone: '', company: '' });
      setShowBookingCalendar(false);
      
      alert('There was an issue with the direct booking system. Your email client will open with a pre-filled booking request.');
    }
  };

  const resetAll = () => {
    setSelectedDate('');
    setSelectedTime('');
    setBookingForm({ name: '', email: '', phone: '', company: '' });
  };

  if (!showBookingCalendar) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Schedule Your Consultation</h3>
          <button
            onClick={() => setShowBookingCalendar(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Form */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Your Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input 
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input 
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input 
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company (Optional)</label>
                <input 
                  type="text"
                  value={bookingForm.company}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>
          
          {/* Date & Time Selection */}
          <div>
            {/* Date Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Select Date</h4>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {availableDates.slice(0, 12).map((dateObj) => (
                  <button
                    key={dateObj.date}
                    onClick={() => setSelectedDate(dateObj.date)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedDate === dateObj.date
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {dateObj.display}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            {selectedDate && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Select Time
                  {loadingSlots && (
                    <span className="ml-2 text-sm text-gray-400">(Loading available slots...)</span>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                  {getAvailableTimeSlots().length > 0 ? (
                    getAvailableTimeSlots().map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        disabled={loadingSlots}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                            : loadingSlots
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))
                  ) : loadingSlots ? (
                    <div className="col-span-2 text-center text-gray-400 py-4">
                      Loading available time slots...
                    </div>
                  ) : (
                    <div className="col-span-2 text-center text-gray-400 py-4">
                      No available slots for this date. Please select another date.
                    </div>
                  )}
                </div>
                
                {bookedSlots.length > 0 && !loadingSlots && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400">
                      <strong>Unavailable times:</strong> {bookedSlots.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Booking Summary & Submit */}
        {selectedDate && selectedTime && bookingForm.name && bookingForm.email && bookingForm.phone && (
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Booking Summary</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 mb-2"><strong>Name:</strong> {bookingForm.name}</p>
                <p className="text-gray-300 mb-2"><strong>Email:</strong> {bookingForm.email}</p>
                <p className="text-gray-300 mb-2"><strong>Phone:</strong> {bookingForm.phone}</p>
                {bookingForm.company && <p className="text-gray-300"><strong>Company:</strong> {bookingForm.company}</p>}
              </div>
              <div>
                <p className="text-gray-300 mb-2">
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Time:</strong> {selectedTime}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleBookingSubmit}
                className="flex-1 bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white py-4 rounded-xl font-medium transition-all duration-500 hover:scale-105"
              >
                Send Booking Request
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                onClick={resetAll}
                variant="outline"
                className="px-6 py-4 border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl"
              >
                Reset All
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Available Monday - Friday, 9:00 AM - 5:00 PM GMT • All fields marked with * are required
          </p>
        </div>
      </div>
    </div>
  );
};

const IngeniousCapital = () => {
  const [currentPage, setCurrentPage] = useState('logo');
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Prevent body scroll when on logo page
  useEffect(() => {
    if (currentPage === 'logo') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentPage]);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const scrollToSection = (sectionId) => {
    setCurrentPage('site');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset for fixed navigation (80px height)
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const AnimatedCounter = ({ end, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    
    useEffect(() => {
      if (!hasAnimated) {
        const timer = setTimeout(() => {
          setHasAnimated(true);
          let current = 0;
          const increment = end / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
          return () => clearInterval(timer);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [end, hasAnimated]);
    
    return <span>{prefix}{count}{suffix}</span>;
  };

  // Logo Page Component
  const LogoPage = () => (
    <div className="h-screen w-screen overflow-hidden bg-black flex flex-col">
      {/* Navigation Links - Top */}
      <nav className="w-full py-8">
        <div className="flex justify-center items-center space-x-16">
          {[
            { id: 'about', label: 'Our Approach' },
            { id: 'services', label: 'Services' },
            { id: 'team', label: 'Team' },
            { id: 'investor-network', label: 'Investor Network' },
            { id: 'invest', label: 'Invest' },
            { id: 'contact', label: 'Contact' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white text-lg font-medium hover:text-teal-400 transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Logo Frame - Takes remaining space */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div 
          className="w-full h-full max-w-4xl max-h-4xl flex items-center justify-center bg-black rounded-3xl border-4 border-gray-700 cursor-pointer group hover:border-gray-600 transition-colors duration-300"
          onClick={() => scrollToSection('about')}
        >
          <img 
            src="https://customer-assets.emergentagent.com/job_capital-forge/artifacts/6pf5cx6a_Logo%20New.jpg" 
            alt="Ingenious Capital - Click to Enter" 
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );

  // Main Site Component
  const MainSite = () => (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigateToPage('logo')}
              className="text-white hover:text-teal-400 transition-colors font-medium"
            >
              ← Back to Home
            </button>
            
            <div className="flex items-center space-x-12">
              {[
                { id: 'about', label: 'Our Approach' },
                { id: 'services', label: 'Services' },
                { id: 'team', label: 'Team' },
                { id: 'investor-network', label: 'Investor Network' },
                { id: 'invest', label: 'Invest' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Our Approach Section */}
      <section id="about" className="min-h-screen pt-20 pb-8 bg-gray-800 relative overflow-hidden flex items-center">
        <div className="max-w-full mx-auto px-2 relative z-10 w-full">
          <div className="text-center mb-12">
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-6xl mx-auto leading-relaxed font-light backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-gray-700">
              As a sophisticated or high net worth investor, it is unlikely that we are the first investment portal that you have visited, and it is with that in mind that we try to do things differently. 
              Our focus is you and how we can help you to declutter your finances and simplify your investments.
            </p>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Approach</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-5xl mx-auto font-light leading-relaxed">
              To familiarize yourself with non-traditional, alternative investments requires a partner 
              who has a substantial stake in the game themselves to ensure that the decision
              making is in everybody's best interests. Ingenious Capital does exactly that by co-investing
              in every project that it promotes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center max-w-full mx-auto px-4">
            <div className="w-full">
              <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 h-full">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-2xl mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  Enhanced Liquidity
                </h3>
                <p className="text-base text-gray-300 leading-relaxed mb-3">
                  Enhanced profits come at a price – lack of liquidity. 
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent mb-4">
                  UNTIL NOW...
                </p>
                <p className="text-base text-gray-300 leading-relaxed">
                  Ingenious Capital invests into a diverse portfolio of assets ranging from commodities, 
                  shares, ETF's and AIM listed Companies to maintain liquidity and create income. We also invest in property 
                  based business opportunities such as hotels, build to rent units, self storage, holiday parks 
                  and more recently, in demand sporting facilities such as Padel Tennis Centres, considering only those with capable and proven operators. We see this as de-risking 
                  property investment, no developer risk (we have witnessed so many developments fail that involve construction 
                  and planning risk). <span className="text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">This philosophy means that 50% of your funds invested are available to you on 48 hours notice, 
                  with the other 50% on a maximum of 180 days notice.</span>
                </p>
              </div>
            </div>
            
            <div className="w-full">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 h-full">
                  <img
                    src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg"
                    alt="Financial charts"
                    className="w-full h-48 rounded-2xl mb-6 object-cover"
                  />
                  
                  <h4 className="text-2xl font-bold text-white mb-4 text-center">Investment Returns</h4>
                  <p className="text-base text-gray-300 mb-6 text-center">
                    A world with targeted returns of 1.5 to 6 times initial investment and IRR's of 25-30%.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-teal-500/30">
                      <div className="text-3xl font-bold text-teal-500 mb-2">1.5-6x</div>
                      <div className="text-gray-300 font-medium text-sm">Return Multiple</div>
                      <div className="mt-3 bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-orange-500/30">
                      <div className="text-3xl font-bold text-orange-500 mb-2">25-30%</div>
                      <div className="text-gray-300 font-medium text-sm">Targeted IRR</div>
                      <div className="mt-3 bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen py-32 bg-gray-900 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1540760029765-138c8f6d2eac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2V8ZW58MHx8fHwxNzU1MDEwOTM5fDA&ixlib=rb-4.1.0&q=85" 
            alt="Luxury office" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Tailored Investment <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              We will tailor your investment to suit you, with funds being distributed in accordance with your end goals. 
              You may want quarterly income, you may want compound growth, you may require Shariah compliant investing, 
              you may want to make regular contributions rather than a lump sum. We can accommodate all of your needs to 
              ensure that you are comfortable with the way that your funds are invested and the returns that you are achieving.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section id="invest" className="min-h-screen py-32 bg-gray-900 relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Investment <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We share all of our risk evaluation data with you to show what makes for a good investment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-2xl mr-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Selected Co-Investments</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Remember, you are generally investing into a specific company or individual with returns 
                  dictated by (i) the viability of the product or project they are offering and 
                  (ii) their ability bring it to fruition at the right price in the right timeframe.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  It is our job to ensure that both of these are positive and we then factor in our view 
                  of market conditions over the term the investment.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-teal-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
                <h4 className="text-2xl font-bold text-white mb-8">Investment Process</h4>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                    <span className="text-gray-300">Due diligence and risk evaluation</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                    <span className="text-gray-300">Market conditions assessment</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                    <span className="text-gray-300">Co-investment commitment</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold">4</div>
                    <span className="text-gray-300">Fund release and share allocation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* The Due Diligence Process - Full Width */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h4 className="text-2xl font-bold text-white mb-8">The Due Diligence Process</h4>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  For every opportunity Ingenious Capital issues a Pitch Page or a Pitch Deck contains the core proposition, 
                  information about the business and an important disclosure document, which we call the Summary of Key Information 
                  (you will receive the Summary of Key Information via email). All investors must read the Pitch Page and the 
                  Summary of Key Information, because they contain important due diligence information.
                </p>
                
                <p>
                  You must also consider your own personal investment requirements and consider making your own further due diligence 
                  enquiries, which you can do by contacting us via Whatsapp or email to ask the company questions about the business 
                  and/or investment proposition. Ingenious Capital Ltd provides detailed information and analysis on each investment 
                  opportunity to help you make informed decisions. However, we do not offer personalized financial advice. We recommend 
                  consulting with a qualified financial advisor to determine which investments align best with your financial goals and 
                  risk tolerance.
                </p>
                
                <div className="pt-6">
                  <h5 className="text-xl font-bold text-white mb-4">How is the share price calculated?</h5>
                  <p className="mb-6">
                    The share price for each investment is calculated based on a thorough evaluation of the company's current financial 
                    status, market conditions, and growth potential. This includes an assessment of the company's assets, liabilities, 
                    revenue, and future earning prospects. The share price reflects the fair market value of the company's equity at 
                    the time of the offering.
                  </p>
                  
                  <h5 className="text-xl font-bold text-white mb-4">How is the valuation of a company calculated?</h5>
                  <p className="mb-4">
                    The valuation of a company on Ingenious Capital Ltd is determined using various methodologies, depending on the 
                    nature of the business and the available financial data. Common methods include:
                  </p>
                  
                  <ul className="space-y-2 mb-6 pl-4">
                    <li>• <strong>Discounted Cash Flow (DCF) Analysis:</strong> Projects future cash flows and discounts them back to present value.</li>
                    <li>• <strong>Comparable Company Analysis:</strong> Evaluates the valuation of similar companies in the same industry.</li>
                    <li>• <strong>Precedent Transactions Analysis:</strong> Looks at past transactions of similar companies.</li>
                    <li>• <strong>Asset-Based Valuation:</strong> Assesses the value of the company's assets and liabilities.</li>
                  </ul>
                  
                  <p>
                    Our team of experts conducts a rigorous due diligence process to ensure that the valuation is accurate and 
                    reflects the true worth of the company.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Making Your Investment - Full Width */}
          <div className="relative mt-8">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h4 className="text-2xl font-bold text-white mb-8">Making Your Investment</h4>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  The minimum amount you can invest in a pitch on Ingenious Capital Ltd varies depending on the specific investment 
                  opportunity. Generally, the minimum investment amount is designed to be accessible, allowing a wide range of investors 
                  to participate. Specific details for each investment will be identified in the relevant Pitch Page.
                </p>
                
                <p>
                  From here you will complete an application form either as an individual, with a partner or as a company, stating the 
                  amount you wish to invest and confirming your HNW or Sophisticated Investor status. You are also required to submit 
                  identity documents as part of the KYC process and confirm the source of your funds to meet anti money laundering 
                  requirements.
                </p>
              </div>
            </div>
          </div>
          
          {/* What happens after you've invested - Full Width */}
          <div className="relative mt-8">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h4 className="text-2xl font-bold text-white mb-8">What happens after you've invested?</h4>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  After you've made an investment, your funds will be allocated to the chosen opportunity, and you will become an 
                  equity holder in the respective company or project. You will receive a confirmation email detailing the specifics 
                  of your investment. This will provide you with your own log in to your investor portal where you can track the 
                  progress of your investment through your investment account, and you will receive regular updates from the businesses 
                  you've invested in.
                </p>
                
                <p>
                  These updates may include financial reports, progress on business milestones, strategic developments, and other 
                  relevant information - Ingenious Capital ensures that investors are kept informed through periodic emails and 
                  updates on your account dashboard.
                </p>
                
                <p>
                  Once you receive your ownership statement, you will have official documentation confirming your stake in the 
                  investment. This statement will outline the number of shares or units you hold, the value of your investment, 
                  and any relevant terms or conditions. You should review this document carefully and keep it for your records.
                </p>
              </div>
            </div>
          </div>
          
          {/* Making a return on your investment - Full Width */}
          <div className="relative mt-8">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h4 className="text-2xl font-bold text-white mb-8">Making a return on your investment</h4>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  You can make a return on your investment through various means, depending on the type of investment you choose. 
                  Common ways to earn returns include:
                </p>
                
                <ul className="space-y-2 pl-4">
                  <li>• <strong>Dividends:</strong> Periodic payments made by the company to its shareholders from its profits.</li>
                  <li>• <strong>Capital Gains:</strong> The profit earned when you sell your shares for a higher price than you initially paid.</li>
                  <li>• <strong>Interest Payments:</strong> For debt investments, you receive regular interest payments until the principal is repaid.</li>
                  <li>• <strong>Exit Events:</strong> Selling your shares during an acquisition, merger, or initial public offering (IPO), potentially yielding a significant return.</li>
                </ul>
                
                <p>
                  In some circumstances, you may be required to sell your shares. These situations are typically outlined in the 
                  company's articles of association or shareholder agreements and may include events such as:
                </p>
                
                <ul className="space-y-2 pl-4">
                  <li>• <strong>Acquisition or Merger:</strong> If the company is acquired or merges with another entity.</li>
                  <li>• <strong>Drag-Along Rights:</strong> If a majority shareholder decides to sell their stake, minority shareholders may be compelled to sell their shares under certain conditions.</li>
                  <li>• <strong>Company Buy-Backs:</strong> If the company decides to repurchase shares from shareholders as part of a strategic move.</li>
                </ul>
                
                <p>
                  This is where Ingenious Capital really comes into its own. Through the advices given by our regulated accountancy 
                  partners at Cubed Consultancy we advise on an individual basis as to the potential tax saving schemes that you may 
                  be eligible for, in some cases reducing your tax liability to NIL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="min-h-screen py-32 bg-gray-800 relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Expert Investment <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our experienced team brings together deep expertise in venture capital, private equity, 
              and structured finance to deliver exceptional results for our investors.
            </p>
          </div>
          
          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-700 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">75+</div>
              <h3 className="text-lg font-semibold text-white mb-2">Years Combined Experience</h3>
              <p className="text-sm text-gray-400">Venture capital, private equity, and structured finance</p>
            </div>
            
            <div className="text-center bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-700 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">£200M+</div>
              <h3 className="text-lg font-semibold text-white mb-2">Capital Deployed</h3>
              <p className="text-sm text-gray-400">Across 100+ early-stage and growth deals</p>
            </div>
            
            <div className="text-center bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-700 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">Multiple</div>
              <h3 className="text-lg font-semibold text-white mb-2">Successful Exits</h3>
              <p className="text-sm text-gray-400">To major acquirers and strategic buyers</p>
            </div>
            
            <div className="text-center bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-700 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-teal-600 to-orange-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">Diverse</div>
              <h3 className="text-lg font-semibold text-white mb-2">Sector Expertise</h3>
              <p className="text-sm text-gray-400">AI, biotech, fintech, stock analysis & property</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Investor Network Section */}
      <section id="investor-network" className="min-h-screen py-32 bg-gray-900 relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Our Investor <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Network</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              As we develop our client base we will be looking to cap it at no more than 500, to ensure that we are able to give a complete and personalised service to all of our customers. With that in mind when you make your first investment you will be allocated a membership number to ensure that you do not miss out on any of the upcoming opportunities.
            </p>
          </div>
          
          {/* Investor Network Benefits */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Investor Network Benefits</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg mt-1 flex-shrink-0">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Exclusive Deal Flow</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Access to pre-seed and mezzanine opportunities before they reach the market
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg mt-1 flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Quarterly Reporting</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Transparent performance updates and portfolio company progress
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-2 rounded-lg mt-1 flex-shrink-0">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Co-Investment</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Opportunities for direct investment alongside the fund
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-teal-600 to-orange-600 p-2 rounded-lg mt-1 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Investor Events</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Regular networking events and portfolio company presentations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-teal-500 to-orange-500 p-2 rounded-lg mt-1 flex-shrink-0">
                      <Percent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Discounted Partner Services</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Discounted pricing on all our partner services including:
                      </p>
                      <ul className="text-gray-400 text-sm mt-2 space-y-1 pl-4">
                        <li>• Accounting & Tax positioning</li>
                        <li>• Legal services</li>
                        <li>• Will Writing</li>
                        <li>• Discretionary Trust set up</li>
                        <li>• Pension advice</li>
                        <li>• Mortgage reviews</li>
                        <li>• Investment Appraisals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Membership highlight */}
              <div className="mt-12 text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-teal-500/30">
                <h4 className="text-2xl font-bold text-white mb-4">Limited Membership</h4>
                <div className="flex justify-center items-center space-x-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-teal-500 mb-2">500</div>
                    <div className="text-gray-300 font-medium text-sm">Maximum Members</div>
                  </div>
                  <div className="w-px h-16 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">#1</div>
                    <div className="text-gray-300 font-medium text-sm">Your Membership Number</div>
                  </div>
                </div>
                <p className="text-gray-400 mt-4 text-sm">
                  Exclusive membership ensures personalized service and priority access to opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-32 relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1525896544042-354764aa27e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBvZmZpY2V8ZW58MHx8fHwxNzU1MDEwOTM5fDA&ixlib=rb-4.1.0&q=85" 
            alt="Luxury office interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">Get In <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Touch</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to take control of your wealth? Contact our team for a confidential discussion 
              about your investment opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-700">
                <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-2xl">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Phone</p>
                      <p className="text-gray-300">020 3916 5288</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-2xl">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Email</p>
                      <p className="text-gray-300">investor@ingcap.co.uk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 rounded-2xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Address</p>
                      <p className="text-gray-300">1 Canada Square, Canary Wharf, London E14 5AA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-4">Investment Minimum</h4>
                <p className="text-gray-300 mb-6">
                  Membership of Ingenious Capital is <strong>free</strong>, but strictly limited. 
                  Availability is on a <strong>first-come, first-served</strong> basis.
                </p>
                <div className="text-4xl font-bold text-white mb-2">£25,000</div>
                <p className="text-gray-400">Minimum initial investment</p>
              </div>
            </div>
            
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-700">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">First Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors backdrop-blur-sm placeholder-gray-400"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors backdrop-blur-sm placeholder-gray-400"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors backdrop-blur-sm placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Investment Interest</label>
                  <select className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors backdrop-blur-sm">
                    <option value="" className="bg-gray-900">Select investment range</option>
                    <option value="25k-50k" className="bg-gray-900">£25,000 - £50,000</option>
                    <option value="50k-100k" className="bg-gray-900">£50,000 - £100,000</option>
                    <option value="100k-500k" className="bg-gray-900">£100,000 - £500,000</option>
                    <option value="500k+" className="bg-gray-900">£500,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-teal-500 focus:outline-none transition-colors resize-none backdrop-blur-sm placeholder-gray-400"
                    placeholder="Tell us about your investment goals..."
                  ></textarea>
                </div>
                
                <Button 
                  type="button"
                  onClick={() => setShowBookingCalendar(true)}
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600 text-white py-6 rounded-xl text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gray-800 p-2 rounded-2xl shadow-2xl">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_capital-forge/artifacts/6pf5cx6a_Logo%20New.jpg" 
                    alt="Ingenious Capital" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">Ingenious</span>
                  <span className="block text-sm font-medium text-gray-400 tracking-wider">CAPITAL</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                An investment company offering opportunities exclusively to High Net Worth Individuals (HNWIs) 
                and Sophisticated Investors as defined under the Financial Services and Markets Act 2000.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Our Approach', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Team', id: 'team' },
                  { label: 'Investor Network', id: 'investor-network' },
                  { label: 'Investment', id: 'invest' }
                ].map(link => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Notice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Risk Disclosure</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Regulatory Information</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Ingenious Capital Ltd. All rights reserved. 
              Ingenious Capital Limited is not authorised or regulated by the Financial Conduct Authority (FCA).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Render based on current page
  return (
    <>
      {currentPage === 'logo' ? <LogoPage /> : <MainSite />}
      <BookingCalendar
        showBookingCalendar={showBookingCalendar}
        setShowBookingCalendar={setShowBookingCalendar}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        bookingForm={bookingForm}
        setBookingForm={setBookingForm}
      />
    </>
  );
};

export default IngeniousCapital;