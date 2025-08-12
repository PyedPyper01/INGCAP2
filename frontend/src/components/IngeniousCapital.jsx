import React, { useState, useEffect } from 'react';
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
  MapPin
} from 'lucide-react';

const IngeniousCapital = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  // Track scroll for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime = null;
      const startCount = 0;
      
      const counter = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
          setCount(Math.floor((progress / duration) * end));
          requestAnimationFrame(counter);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(counter);
    }, [end, duration]);
    
    return <span>{prefix}{count}{suffix}</span>;
  };

  const FloatingCard = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
    
    return (
      <div className={`transform transition-all duration-1000 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">Ingenious Capital</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'Our Approach' },
                { id: 'services', label: 'Services' },
                { id: 'team', label: 'Team' },
                { id: 'invest', label: 'Invest' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-slate-900' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 transform scale-x-100 transition-transform duration-300" />
                  )}
                </button>
              ))}
              
              <Button 
                onClick={() => scrollToSection('invest')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-6 py-4 space-y-4">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'Our Approach' },
                { id: 'services', label: 'Services' },
                { id: 'team', label: 'Team' },
                { id: 'invest', label: 'Invest' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <FloatingCard>
            <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight">
              Innovate.{' '}
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Inspire.
              </span>{' '}
              Invest.
            </h1>
          </FloatingCard>
          
          <FloatingCard delay={300}>
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              As a sophisticated or high net worth investor, we try to do things differently. 
              Our focus is you and how we can help you to declutter your finances and simplify your investments.
            </p>
          </FloatingCard>
          
          <FloatingCard delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                onClick={() => scrollToSection('about')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
              >
                Discover Our Approach
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('invest')}
                className="border-slate-300 text-slate-900 hover:bg-slate-50 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
              >
                Start Investing
              </Button>
            </div>
          </FloatingCard>
          
          {/* Key Statistics */}
          <FloatingCard delay={900}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <p className="text-slate-600">Years Combined Experience</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  £<AnimatedCounter end={30} suffix="M+" />
                </div>
                <p className="text-slate-600">Capital Deployed</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter end={30} suffix="%" />
                </div>
                <p className="text-slate-600">Internal Rate of Return</p>
              </div>
            </div>
          </FloatingCard>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-slate-400" />
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              To familiarize yourself with non-traditional, alternative investments requires a partner 
              who has a substantial stake in the game themselves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <FloatingCard>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">
                  Enhanced Liquidity
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Enhanced profits come at a price – lack of liquidity. <strong>UNTIL NOW...</strong>
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Ingenious Capital invests into a diverse portfolio of assets ranging from commodities, 
                  shares, ETF's and AIM listed Companies to maintain liquidity and create income.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-900">
                  <h4 className="font-bold text-slate-900 mb-2">Flexible Withdrawals</h4>
                  <p className="text-slate-700">
                    <strong>Withdraw 50% at 48 hours notice • Balance at 180 days notice</strong>
                  </p>
                </div>
              </div>
            </FloatingCard>
            
            <FloatingCard delay={200}>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-bold mb-4">Investment Returns</h4>
                <p className="text-lg mb-6">
                  A world with targeted returns of 1.5 to 6 times initial investment over a period of 3 to 6 years.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">1.5-6x</div>
                    <div className="text-sm text-slate-300">Return Multiple</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">3-6</div>
                    <div className="text-sm text-slate-300">Years</div>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Tailored Investment Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We operate to ensure that investors are comfortable in their investment and can afford to invest 
              in the knowledge that a significant part of their funds can be withdrawn quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <FloatingCard>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Co-Investment Strategy</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Ingenious Capital co-invests in every project that it promotes, ensuring decision making 
                    is in everybody's best interests.
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>
            
            <FloatingCard delay={200}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Tax Optimization</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Maximize various tax incentives for optimum returns with our comprehensive tax optimization strategies.
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>
            
            <FloatingCard delay={400}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Enhanced Liquidity</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Continuous liquidity with 50% of invested funds available on 48 hours notice and the balance within 180 days.
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
          
          {/* Free Financial Healthcheck */}
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Free Financial Healthcheck</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We want to be the investment partner to guide you through the financial maze. 
                We carry out a free assessment of your current portfolios, identifying areas of risk.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle, title: 'Annual Mortgage Review', desc: "Ensure you're not paying more than you should be" },
                { icon: Shield, title: 'Professional Will Writing', desc: "Protect yours and your family's wealth" },
                { icon: PieChart, title: 'Pension Review', desc: 'Multiple pensions or retirement drawdown optimization' },
                { icon: Users, title: 'Insurance Review', desc: 'Protection from employment loss, illness or death' },
                { icon: Target, title: 'Tax Optimization', desc: 'Maximize various tax incentives for optimum returns' },
                { icon: BarChart3, title: 'Secondary Market', desc: 'Offload underperforming investments' }
              ].map((service, index) => (
                <FloatingCard key={index} delay={index * 100}>
                  <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="bg-slate-900 p-2 rounded-lg">
                      <service.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{service.title}</h4>
                      <p className="text-sm text-slate-600">{service.desc}</p>
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-slate-500">
                All services provided by FCA regulated partners • No affiliate fees • Maximum discounts negotiated for you
              </p>
            </div>
          </div>
        </div>
      </section>
    </CardContent>
    </Card>
    </FloatingCard>
  ))}
</div>

<div className="text-center mt-12">
  <Button 
    size="lg"
    onClick={() => scrollToSection('contact')}
    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
  >
    Contact Our Team
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</div>
</div>
</section>

{/* Investment Opportunities Section */}
<section id="invest" className="py-20 bg-white">
<div className="max-w-7xl mx-auto px-6">
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
      Investment Opportunities
    </h2>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
      We share all of our risk evaluation data with you to show what makes for a good investment.
    </p>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
    <FloatingCard>
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Our Selected Co-Investments</h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          Remember, you are generally investing into a specific company or individual with returns 
          dictated by (i) the viability of the product or project they are offering and 
          (ii) their ability bring it to fruition at the right price in the right timeframe.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          It is our job to ensure that both of these are positive and we then factor in our view 
          of market conditions over the term the investment.
        </p>
      </div>
    </FloatingCard>
    
    <FloatingCard delay={200}>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl">
        <h4 className="text-2xl font-bold text-slate-900 mb-6">Investment Process</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-slate-700">Due diligence and risk evaluation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-slate-700">Market conditions assessment</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <span className="text-slate-700">Co-investment commitment</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <span className="text-slate-700">Fund release and share allocation</span>
          </div>
        </div>
      </div>
    </FloatingCard>
  </div>
  
  {/* Investment Services */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <FloatingCard>
      <Card className="h-full border-none shadow-lg">
        <CardContent className="p-8">
          <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Investment Review</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Have you seen an investment opportunity that you are considering? Our investment banking 
            background can help you make the final decision. We will carry out a full due diligence 
            review of the project or product and give you our feedback completely free of charge.
          </p>
          <p className="text-sm text-slate-500">
            (If we recommend the investment, we may even invest ourselves)
          </p>
        </CardContent>
      </Card>
    </FloatingCard>
    
    <FloatingCard delay={200}>
      <Card className="h-full border-none shadow-lg">
        <CardContent className="p-8">
          <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <PieChart className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Review</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            How are your current investments performing? Are you getting paid on time, 
            is there a threat of administration, or just a bad feeling about things on your part?
          </p>
          <p className="text-slate-600 leading-relaxed">
            There are many ways to salvage poor investments, including a change of management control, 
            a refinancing or a sale on our Secondary Market.
          </p>
        </CardContent>
      </Card>
    </FloatingCard>
  </div>
  
  {/* Investor Network Benefits */}
  <div className="mt-16 bg-slate-50 p-8 lg:p-12 rounded-2xl">
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold text-slate-900 mb-4">Join Our Investor Network</h3>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Connect with our team to learn more about investment opportunities and how our 
        dual-strategy approach can enhance your portfolio returns.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { icon: Globe, title: 'Exclusive Deal Flow', desc: 'Access to pre-seed and mezzanine opportunities before they reach the market' },
        { icon: BarChart3, title: 'Quarterly Reporting', desc: 'Transparent performance updates and portfolio company progress' },
        { icon: Users, title: 'Co-Investment', desc: 'Opportunities for direct investment alongside the fund' },
        { icon: Award, title: 'Investor Events', desc: 'Regular networking events and portfolio company presentations' }
      ].map((benefit, index) => (
        <FloatingCard key={index} delay={index * 100}>
          <div className="text-center p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <benefit.icon className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{benefit.title}</h4>
            <p className="text-sm text-slate-600">{benefit.desc}</p>
          </div>
        </FloatingCard>
      ))}
    </div>
  </div>
</div>
</section>

{/* Contact Section */}
<section id="contact" className="py-20 bg-slate-900 text-white">
<div className="max-w-7xl mx-auto px-6">
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h2>
    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
      Ready to take control of your wealth? Contact our team for a confidential discussion 
      about your investment opportunities.
    </p>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
    <FloatingCard>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-slate-800 p-3 rounded-lg">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-slate-300">+44 (0) 20 7xxx xxxx</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-slate-800 p-3 rounded-lg">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-slate-300">info@ingenious-capital.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-slate-800 p-3 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-slate-300">London, United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl">
          <h4 className="font-bold mb-4">Investment Minimum</h4>
          <p className="text-slate-300 mb-4">
            Membership of Ingenious Capital is <strong>free</strong>, but strictly limited. 
            Availability is on a <strong>first-come, first-served</strong> basis.
          </p>
          <div className="text-3xl font-bold text-white">£10,000</div>
          <p className="text-slate-400">Minimum initial investment</p>
        </div>
      </div>
    </FloatingCard>
    
    <FloatingCard delay={200}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-slate-500 focus:outline-none transition-colors"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-slate-500 focus:outline-none transition-colors"
              placeholder="Your last name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-slate-500 focus:outline-none transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Investment Interest</label>
          <select className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-slate-500 focus:outline-none transition-colors">
            <option>Select investment range</option>
            <option>£10,000 - £50,000</option>
            <option>£50,000 - £100,000</option>
            <option>£100,000 - £500,000</option>
            <option>£500,000+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            rows={4}
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-slate-500 focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your investment goals..."
          ></textarea>
        </div>
        
        <Button 
          type="submit"
          size="lg"
          className="w-full bg-white text-slate-900 hover:bg-slate-100 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
        >
          Schedule Consultation
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </FloatingCard>
  </div>
</div>
</section>

{/* Footer */}
<footer className="bg-slate-950 text-white py-12">
<div className="max-w-7xl mx-auto px-6">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="col-span-1 md:col-span-2">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-white to-slate-300 rounded-lg flex items-center justify-center">
          <span className="text-slate-900 font-bold text-xl">I</span>
        </div>
        <span className="text-2xl font-bold">Ingenious Capital</span>
      </div>
      <p className="text-slate-400 mb-6 max-w-lg">
        An investment company offering opportunities exclusively to High Net Worth Individuals (HNWIs) 
        and Sophisticated Investors as defined under the Financial Services and Markets Act 2000.
      </p>
      <div className="flex space-x-4">
        {/* Add social media icons here if needed */}
      </div>
    </div>
    
    <div>
      <h4 className="font-bold mb-4">Quick Links</h4>
      <ul className="space-y-2">
        {[
          { label: 'Our Approach', id: 'about' },
          { label: 'Services', id: 'services' },
          { label: 'Team', id: 'team' },
          { label: 'Investment', id: 'invest' }
        ].map(link => (
          <li key={link.id}>
            <button 
              onClick={() => scrollToSection(link.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
    
    <div>
      <h4 className="font-bold mb-4">Legal</h4>
      <ul className="space-y-2">
        <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Notice</a></li>
        <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Use</a></li>
        <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Risk Disclosure</a></li>
        <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Regulatory Information</a></li>
      </ul>
    </div>
  </div>
  
  <div className="border-t border-slate-800 mt-12 pt-8 text-center">
    <p className="text-slate-400 text-sm">
      © 2025 Ingenious Capital Ltd. All rights reserved. 
      Ingenious Capital Limited is not authorised or regulated by the Financial Conduct Authority (FCA).
    </p>
  </div>
</div>
</footer>
</div>
);
};

export default IngeniousCapital;