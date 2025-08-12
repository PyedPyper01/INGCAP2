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
  TrendingDown
} from 'lucide-react';

const IngeniousCapital = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Track scroll and mouse position for advanced animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2500 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const countRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTime = null;
            
            const counter = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = timestamp - startTime;
              
              if (progress < duration) {
                const easeOutQuart = 1 - Math.pow(1 - progress / duration, 4);
                setCount(Math.floor(easeOutQuart * end));
                requestAnimationFrame(counter);
              } else {
                setCount(end);
              }
            };
            
            requestAnimationFrame(counter);
          }
        },
        { threshold: 0.5 }
      );
      
      if (countRef.current) observer.observe(countRef.current);
      return () => observer.disconnect();
    }, [end, duration, hasAnimated]);
    
    return <span ref={countRef}>{prefix}{count}{suffix}</span>;
  };

  const RevealOnScroll = ({ children, delay = 0, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );
      
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, [delay]);
    
    const getTransform = () => {
      if (!isVisible) {
        switch (direction) {
          case 'up': return 'translateY(60px)';
          case 'down': return 'translateY(-60px)';
          case 'left': return 'translateX(60px)';
          case 'right': return 'translateX(-60px)';
          default: return 'translateY(60px)';
        }
      }
      return 'translateY(0px)';
    };
    
    return (
      <div
        ref={elementRef}
        style={{
          transform: getTransform(),
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-black font-bold text-2xl">I</span>
              </div>
              <span className="text-2xl font-light tracking-wide text-white">Ingenious Capital</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
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
                  className={`relative text-sm font-light transition-all duration-500 hover:text-white ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 transform scale-x-100 transition-transform duration-700" />
                  )}
                </button>
              ))}
              
              <Button 
                onClick={() => scrollToSection('invest')}
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/98 backdrop-blur-xl border-t border-white/10">
            <div className="px-8 py-8 space-y-6">
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
                  className="block w-full text-left text-lg font-light text-gray-300 hover:text-white transition-colors py-3"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      >
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          {/* Floating Orbs with Mouse Parallax */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
              transition: 'transform 0.5s ease-out',
              animationDelay: '1s'
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <RevealOnScroll>
            <h1 className="text-7xl lg:text-9xl font-extralight text-white mb-8 leading-tight tracking-tight">
              Innovate.{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Inspire.
              </span>{' '}
              <br className="hidden sm:block" />
              Invest.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              As a sophisticated or high net worth investor, we try to do things differently. 
              Our focus is you and how we can help you to declutter your finances and simplify your investments.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg"
                onClick={() => scrollToSection('about')}
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
              >
                Discover Our Approach
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('invest')}
                className="border-white/30 text-white hover:bg-white/10 px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 backdrop-blur-sm"
              >
                Start Investing
              </Button>
            </div>
          </RevealOnScroll>
          
          {/* Enhanced Statistics */}
          <RevealOnScroll delay={900}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <div className="text-5xl font-light text-white mb-3">
                    <AnimatedCounter end={50} suffix="+" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Years Combined Experience</h3>
                  <p className="text-gray-400 text-sm">Venture capital, private equity, and structured finance</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <div className="text-5xl font-light text-white mb-3">
                    £<AnimatedCounter end={30} suffix="M+" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Capital Deployed</h3>
                  <p className="text-gray-400 text-sm">Across 10+ early-stage and growth deals</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <div className="text-5xl font-light text-white mb-3">
                    <AnimatedCounter end={30} suffix="%" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Internal Rate of Return</h3>
                  <p className="text-gray-400 text-sm">Verified past activity demonstrating excellence</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/60" />
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="about" className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-opacity="0.03" fill="%23ffffff"%3E%3Cpolygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40"/%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-8 tracking-tight">
                Our Approach
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                To familiarize yourself with non-traditional, alternative investments requires a partner 
                who has a substantial stake in the game themselves.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <RevealOnScroll direction="left">
              <div className="space-y-8">
                <h3 className="text-4xl font-light text-white mb-6">
                  Enhanced Liquidity
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Enhanced profits come at a price – lack of liquidity. 
                </p>
                <p className="text-2xl font-medium text-white">
                  UNTIL NOW...
                </p>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Ingenious Capital invests into a diverse portfolio of assets ranging from commodities, 
                  shares, ETF's and AIM listed Companies to maintain liquidity and create income.
                </p>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <h4 className="text-xl font-medium text-white mb-4">Flexible Withdrawals</h4>
                  <p className="text-white font-light text-lg">
                    Withdraw <strong>50%</strong> at <strong>48 hours notice</strong><br />
                    Balance at <strong>180 days notice</strong>
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
                <h4 className="text-3xl font-light text-white mb-8">Investment Returns</h4>
                <p className="text-lg text-gray-300 mb-12 font-light">
                  A world with targeted returns of 1.5 to 6 times initial investment over a period of 3 to 6 years.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">1.5-6x</div>
                    <div className="text-gray-400 font-light">Return Multiple</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light text-white mb-2">3-6</div>
                    <div className="text-gray-400 font-light">Years</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-8 tracking-tight">
                Tailored Investment Solutions
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                We operate to ensure that investors are comfortable in their investment and can afford to invest 
                in the knowledge that a significant part of their funds can be withdrawn quickly.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <RevealOnScroll>
              <div className="group h-full">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                  <div className="bg-gradient-to-br from-white to-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-6">Co-Investment Strategy</h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Ingenious Capital co-invests in every project that it promotes, ensuring decision making 
                    is in everybody's best interests.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="group h-full">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                  <div className="bg-gradient-to-br from-white to-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-6">Tax Optimization</h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Maximize various tax incentives for optimum returns with our comprehensive tax optimization strategies.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={400}>
              <div className="group h-full">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                  <div className="bg-gradient-to-br from-white to-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-6">Enhanced Liquidity</h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Continuous liquidity with 50% of invested funds available on 48 hours notice and the balance within 180 days.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Free Financial Healthcheck */}
          <RevealOnScroll>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 lg:p-16">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-light text-white mb-6">Free Financial Healthcheck</h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  We want to be the investment partner to guide you through the financial maze. 
                  We carry out a free assessment of your current portfolios, identifying areas of risk.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: CheckCircle, title: 'Annual Mortgage Review', desc: "Ensure you're not paying more than you should be" },
                  { icon: Shield, title: 'Professional Will Writing', desc: "Protect yours and your family's wealth" },
                  { icon: PieChart, title: 'Pension Review', desc: 'Multiple pensions or retirement drawdown optimization' },
                  { icon: Users, title: 'Insurance Review', desc: 'Protection from employment loss, illness or death' },
                  { icon: Target, title: 'Tax Optimization', desc: 'Maximize various tax incentives for optimum returns' },
                  { icon: BarChart3, title: 'Secondary Market', desc: 'Offload underperforming investments' }
                ].map((service, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <div className="group">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-br from-white to-gray-300 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <service.icon className="h-6 w-6 text-black" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-2">{service.title}</h4>
                            <p className="text-sm text-gray-400 font-light">{service.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-sm text-gray-500 font-light">
                  All services provided by FCA regulated partners • No affiliate fees • Maximum discounts negotiated for you
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-8 tracking-tight">
                Expert Investment Team
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Our experienced team brings together deep expertise in venture capital, private equity, 
                and structured finance to deliver exceptional results for our investors.
              </p>
            </RevealOnScroll>
          </div>
          
          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <RevealOnScroll>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10">
                <div className="text-4xl font-light text-white mb-3">50+</div>
                <h3 className="text-lg font-medium text-white mb-2">Years Combined Experience</h3>
                <p className="text-sm text-gray-400 font-light">Venture capital, private equity, and structured finance</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10">
                <div className="text-4xl font-light text-white mb-3">£30M+</div>
                <h3 className="text-lg font-medium text-white mb-2">Capital Deployed</h3>
                <p className="text-sm text-gray-400 font-light">Across 10+ early-stage and growth deals</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10">
                <div className="text-4xl font-light text-white mb-3">Multiple</div>
                <h3 className="text-lg font-medium text-white mb-2">Successful Exits</h3>
                <p className="text-sm text-gray-400 font-light">To major acquirers and strategic buyers</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={300}>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10">
                <div className="text-4xl font-light text-white mb-3">Diverse</div>
                <h3 className="text-lg font-medium text-white mb-2">Sector Expertise</h3>
                <p className="text-sm text-gray-400 font-light">AI, biotech, fintech, and enterprise software</p>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                name: 'Daniel Moretti',
                title: 'Investment Director',
                bio: 'With extensive experience in the alternative investments sector, Daniel has a proven track record of managing and growing diversified portfolios across asset classes such as private equity, real estate, hedge funds, and structured products.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face&auto=format'
              },
              {
                name: 'Jude Zorlu',
                title: 'Finance Director',
                bio: 'Jude is recognized for his expertise in financial analysis, budgeting and forecasting and risk management. His main focus is on leveraging financial insights to support business growth, and he continues to drive value through innovative financial modelling.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face&auto=format'
              },
              {
                name: 'Dean Curtis',
                title: 'Sales Director',
                bio: 'Dean is recognized for his expertise in account-based marketing, hybrid selling strategies, and leveraging technology to enhance sales performance. His ability to build and maintain key client relationships, combined with a deep understanding of market trends and customer needs, has positioned him as a trusted advisor to both clients and colleagues.',
                image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=600&h=600&fit=crop&crop=face&auto=format'
              }
            ].map((member, index) => (
              <RevealOnScroll key={index} delay={index * 200}>
                <div className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-light mb-1">{member.name}</h3>
                        <p className="text-gray-300 font-light">{member.title}</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <p className="text-gray-300 leading-relaxed mb-8 font-light text-sm">
                        {member.bio}
                      </p>
                      
                      <div className="flex space-x-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-white/20 text-white hover:bg-white/10 font-light"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-white text-black hover:bg-gray-100"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <RevealOnScroll>
              <Button 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
              >
                Contact Our Team
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section id="invest" className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-8 tracking-tight">
                Investment Opportunities
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                We share all of our risk evaluation data with you to show what makes for a good investment.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <RevealOnScroll direction="left">
              <div className="space-y-8">
                <h3 className="text-4xl font-light text-white">Our Selected Co-Investments</h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Remember, you are generally investing into a specific company or individual with returns 
                  dictated by (i) the viability of the product or project they are offering and 
                  (ii) their ability bring it to fruition at the right price in the right timeframe.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  It is our job to ensure that both of these are positive and we then factor in our view 
                  of market conditions over the term the investment.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10">
                <h4 className="text-2xl font-light text-white mb-8">Investment Process</h4>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-medium">1</div>
                    <span className="text-gray-300 font-light">Due diligence and risk evaluation</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-medium">2</div>
                    <span className="text-gray-300 font-light">Market conditions assessment</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-medium">3</div>
                    <span className="text-gray-300 font-light">Co-investment commitment</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-medium">4</div>
                    <span className="text-gray-300 font-light">Fund release and share allocation</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Investment Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealOnScroll>
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full transition-all duration-700 hover:bg-white/10 hover:border-white/20">
                  <div className="bg-gradient-to-br from-white to-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <BarChart3 className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-6">Investment Review</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 font-light">
                    Have you seen an investment opportunity that you are considering? Our investment banking 
                    background can help you make the final decision. We will carry out a full due diligence 
                    review of the project or product and give you our feedback completely free of charge.
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    (If we recommend the investment, we may even invest ourselves)
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full transition-all duration-700 hover:bg-white/10 hover:border-white/20">
                  <div className="bg-gradient-to-br from-white to-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <PieChart className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-6">Portfolio Review</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 font-light">
                    How are your current investments performing? Are you getting paid on time, 
                    is there a threat of administration, or just a bad feeling about things on your part?
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light">
                    There are many ways to salvage poor investments, including a change of management control, 
                    a refinancing or a sale on our Secondary Market.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Investor Network Benefits */}
          <RevealOnScroll>
            <div className="mt-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 lg:p-16">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-light text-white mb-6">Join Our Investor Network</h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Connect with our team to learn more about investment opportunities and how our 
                  dual-strategy approach can enhance your portfolio returns.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Globe, title: 'Exclusive Deal Flow', desc: 'Access to pre-seed and mezzanine opportunities before they reach the market' },
                  { icon: BarChart3, title: 'Quarterly Reporting', desc: 'Transparent performance updates and portfolio company progress' },
                  { icon: Users, title: 'Co-Investment', desc: 'Opportunities for direct investment alongside the fund' },
                  { icon: Award, title: 'Investor Events', desc: 'Regular networking events and portfolio company presentations' }
                ].map((benefit, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <div className="text-center group">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                        <div className="bg-gradient-to-br from-white to-gray-300 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <benefit.icon className="h-8 w-8 text-black" />
                        </div>
                        <h4 className="font-medium text-white mb-3">{benefit.title}</h4>
                        <p className="text-sm text-gray-400 font-light">{benefit.desc}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-8 tracking-tight">Get In Touch</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Ready to take control of your wealth? Contact our team for a confidential discussion 
                about your investment opportunities.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <RevealOnScroll direction="left">
              <div className="space-y-12">
                <div>
                  <h3 className="text-3xl font-light text-white mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white">Phone</p>
                        <p className="text-gray-400 font-light">+44 (0) 20 7xxx xxxx</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white">Email</p>
                        <p className="text-gray-400 font-light">info@ingenious-capital.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white">Address</p>
                        <p className="text-gray-400 font-light">London, United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                  <h4 className="text-xl font-medium text-white mb-4">Investment Minimum</h4>
                  <p className="text-gray-300 mb-6 font-light">
                    Membership of Ingenious Capital is <strong>free</strong>, but strictly limited. 
                    Availability is on a <strong>first-come, first-served</strong> basis.
                  </p>
                  <div className="text-4xl font-light text-white mb-2">£10,000</div>
                  <p className="text-gray-500 font-light">Minimum initial investment</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-3">First Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-colors backdrop-blur-sm font-light"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-3">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-colors backdrop-blur-sm font-light"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-3">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-colors backdrop-blur-sm font-light"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-3">Investment Interest</label>
                    <select className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-colors backdrop-blur-sm font-light">
                      <option value="">Select investment range</option>
                      <option value="10k-50k">£10,000 - £50,000</option>
                      <option value="50k-100k">£50,000 - £100,000</option>
                      <option value="100k-500k">£100,000 - £500,000</option>
                      <option value="500k+">£500,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-3">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-colors resize-none backdrop-blur-sm font-light"
                      placeholder="Tell us about your investment goals..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black hover:bg-gray-100 py-6 rounded-xl text-lg font-medium transition-all duration-500 hover:scale-105"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-2xl flex items-center justify-center">
                  <span className="text-black font-bold text-2xl">I</span>
                </div>
                <span className="text-2xl font-light text-white">Ingenious Capital</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-lg font-light leading-relaxed">
                An investment company offering opportunities exclusively to High Net Worth Individuals (HNWIs) 
                and Sophisticated Investors as defined under the Financial Services and Markets Act 2000.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Our Approach', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Team', id: 'team' },
                  { label: 'Investment', id: 'invest' }
                ].map(link => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white transition-colors font-light"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Privacy Notice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Risk Disclosure</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Regulatory Information</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center">
            <p className="text-gray-500 text-sm font-light">
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