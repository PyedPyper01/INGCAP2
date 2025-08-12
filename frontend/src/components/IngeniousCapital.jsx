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

const IngeniousCapital = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const ParallaxImage = ({ src, className = '', alt = '' }) => {
    const [offset, setOffset] = useState(0);
    const imageRef = useRef(null);
    
    useEffect(() => {
      const handleScroll = () => {
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          setOffset(scrolled * 0.3);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
      <div ref={imageRef} className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <span className="text-white font-bold text-2xl transform -rotate-12">I</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">Ingenious</span>
                <span className="block text-sm font-medium text-gray-500 tracking-wider">CAPITAL</span>
              </div>
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
                  className={`relative text-sm font-medium transition-all duration-500 hover:text-gray-900 ${
                    activeSection === item.id 
                      ? 'text-gray-900' 
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-100 transition-transform duration-700" />
                  )}
                </button>
              ))}
              
              <Button 
                onClick={() => scrollToSection('invest')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
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
                  className="block w-full text-left text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-3"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxmaW5hbmNlfGVufDB8fHx8MTc1NTAxMDk0NHww&ixlib=rb-4.1.0&q=85"
            alt="Financial district skyscrapers"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated geometric shapes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${
                i % 2 === 0 ? 'from-blue-500/10 to-purple-500/10' : 'from-purple-500/10 to-indigo-500/10'
              } blur-3xl animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <RevealOnScroll>
            <h1 className="text-7xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Innovate.
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-100 via-white to-blue-100 bg-clip-text text-transparent">
                Inspire.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-100 via-purple-100 to-white bg-clip-text text-transparent">
                Invest.
              </span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/20">
              As a sophisticated or high net worth investor, we try to do things differently. 
              Our focus is you and how we can help you to declutter your finances and simplify your investments.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg"
                onClick={() => scrollToSection('about')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                Discover Our Approach
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('invest')}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 backdrop-blur-sm"
              >
                Start Investing
              </Button>
            </div>
          </RevealOnScroll>
          
          {/* Enhanced Statistics with Rich Graphics */}
          <RevealOnScroll delay={900}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white mb-1">
                        <AnimatedCounter end={50} suffix="+" />
                      </div>
                      <div className="text-white/80 text-sm">Years</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Combined Experience</h3>
                  <p className="text-white/70 text-sm">Venture capital, private equity, and structured finance expertise</p>
                  <div className="mt-4 bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-2xl">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white mb-1">
                        £<AnimatedCounter end={30} suffix="M+" />
                      </div>
                      <div className="text-white/80 text-sm">Deployed</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Capital Deployed</h3>
                  <p className="text-white/70 text-sm">Across 10+ early-stage and growth investment deals</p>
                  <div className="mt-4 bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 rounded-2xl">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white mb-1">
                        <AnimatedCounter end={30} suffix="%" />
                      </div>
                      <div className="text-white/80 text-sm">Returns</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Internal Rate of Return</h3>
                  <p className="text-white/70 text-sm">Verified past activity demonstrating consistent excellence</p>
                  <div className="mt-4 bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full w-5/6 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/60 mx-auto" />
            <p className="text-white/60 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="about" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Approach</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                To familiarize yourself with non-traditional, alternative investments requires a partner 
                who has a substantial stake in the game themselves.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <RevealOnScroll direction="left">
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                  <h3 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl mr-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    Enhanced Liquidity
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Enhanced profits come at a price – lack of liquidity. 
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    UNTIL NOW...
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Ingenious Capital invests into a diverse portfolio of assets ranging from commodities, 
                    shares, ETF's and AIM listed Companies to maintain liquidity and create income.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-6 w-6 text-blue-600 mr-3" />
                      Flexible Withdrawals
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Withdraw 50% in</span>
                        <span className="font-bold text-blue-600">48 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Balance in</span>
                        <span className="font-bold text-purple-600">180 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                  <ParallaxImage
                    src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg"
                    alt="Financial charts"
                    className="w-full h-64 rounded-2xl mb-8"
                  />
                  
                  <h4 className="text-3xl font-bold text-gray-900 mb-6 text-center">Investment Returns</h4>
                  <p className="text-lg text-gray-600 mb-8 text-center">
                    A world with targeted returns of 1.5 to 6 times initial investment over a period of 3 to 6 years.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">1.5-6x</div>
                      <div className="text-gray-600 font-medium">Return Multiple</div>
                      <div className="mt-3 bg-blue-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
                      <div className="text-4xl font-bold text-purple-600 mb-2">3-6</div>
                      <div className="text-gray-600 font-medium">Years</div>
                      <div className="mt-3 bg-purple-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Section with Rich Graphics */}
      <section id="services" className="py-32 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1540760029765-138c8f6d2eac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2V8ZW58MHx8fHwxNzU1MDEwOTM5fDA&ixlib=rb-4.1.0&q=85" 
            alt="Luxury office" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                Tailored Investment <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solutions</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                We operate to ensure that investors are comfortable in their investment and can afford to invest 
                in the knowledge that a significant part of their funds can be withdrawn quickly.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <RevealOnScroll>
              <div className="group h-full">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 h-full transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105 border border-blue-100">
                  <div className="relative mb-8">
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Co-Investment Strategy</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Ingenious Capital co-invests in every project that it promotes, ensuring decision making 
                    is in everybody's best interests.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="group h-full">
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 h-full transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105 border border-purple-100">
                  <div className="relative mb-8">
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Optimization</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Maximize various tax incentives for optimum returns with our comprehensive tax optimization strategies.
                  </p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={400}>
              <div className="group h-full">
                <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-10 h-full transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105 border border-indigo-100">
                  <div className="relative mb-8">
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Enhanced Liquidity</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Continuous liquidity with 50% of invested funds available on 48 hours notice and the balance within 180 days.
                  </p>
                  <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Free Financial Healthcheck with Rich Visuals */}
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 lg:p-16 border border-gray-100 shadow-2xl">
                {/* Background Image Overlay */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 overflow-hidden rounded-r-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxmaW5hbmNlfGVufDB8fHx8MTc1NTAxMDk0NHww&ixlib=rb-4.1.0&q=85" 
                    alt="Financial analysis" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                      <Activity className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Free Financial Healthcheck</h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                      We want to be the investment partner to guide you through the financial maze. 
                      We carry out a free assessment of your current portfolios, identifying areas of risk.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { icon: CheckCircle, title: 'Annual Mortgage Review', desc: "Ensure you're not paying more than you should be", color: 'from-blue-500 to-blue-600 border-blue-100 hover:border-blue-200' },
                      { icon: Shield, title: 'Professional Will Writing', desc: "Protect yours and your family's wealth", color: 'from-purple-500 to-purple-600 border-purple-100 hover:border-purple-200' },
                      { icon: PieChart, title: 'Pension Review', desc: 'Multiple pensions or retirement drawdown optimization', color: 'from-indigo-500 to-indigo-600 border-indigo-100 hover:border-indigo-200' },
                      { icon: Users, title: 'Insurance Review', desc: 'Protection from employment loss, illness or death', color: 'from-green-500 to-green-600 border-green-100 hover:border-green-200' },
                      { icon: Target, title: 'Tax Optimization', desc: 'Maximize various tax incentives for optimum returns', color: 'from-orange-500 to-orange-600 border-orange-100 hover:border-orange-200' },
                      { icon: BarChart3, title: 'Secondary Market', desc: 'Offload underperforming investments', color: 'from-red-500 to-red-600 border-red-100 hover:border-red-200' }
                    ].map((service, index) => (
                      <RevealOnScroll key={index} delay={index * 100}>
                        <div className="group">
                          <div className={`bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:transform hover:scale-105 border ${service.color}`}>
                            <div className={`bg-gradient-to-r ${service.color.split(' ')[0]} ${service.color.split(' ')[1]} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                              <service.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-3">{service.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                          </div>
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                  
                  <div className="text-center mt-12">
                    <p className="text-sm text-gray-500 font-light bg-gray-100 rounded-full px-6 py-3 inline-block">
                      All services provided by FCA regulated partners • No affiliate fees • Maximum discounts negotiated for you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Team Section with Professional Photography */}
      <section id="team" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                Expert Investment <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our experienced team brings together deep expertise in venture capital, private equity, 
                and structured finance to deliver exceptional results for our investors.
              </p>
            </RevealOnScroll>
          </div>
          
          {/* Team Statistics with Rich Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <RevealOnScroll>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">50+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Years Combined Experience</h3>
                <p className="text-sm text-gray-600">Venture capital, private equity, and structured finance</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">£30M+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Capital Deployed</h3>
                <p className="text-sm text-gray-600">Across 10+ early-stage and growth deals</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">Multiple</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Successful Exits</h3>
                <p className="text-sm text-gray-600">To major acquirers and strategic buyers</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={300}>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">Diverse</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sector Expertise</h3>
                <p className="text-sm text-gray-600">AI, biotech, fintech, and enterprise software</p>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Team Members with Professional Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                name: 'Daniel Moretti',
                title: 'Investment Director',
                bio: 'With extensive experience in the alternative investments sector, Daniel has a proven track record of managing and growing diversified portfolios across asset classes such as private equity, real estate, hedge funds, and structured products.',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU1MDEwOTQ4fDA&ixlib=rb-4.1.0&q=85'
              },
              {
                name: 'Jude Zorlu',
                title: 'Finance Director',
                bio: 'Jude is recognized for his expertise in financial analysis, budgeting and forecasting and risk management. His main focus is on leveraging financial insights to support business growth, and he continues to drive value through innovative financial modelling.',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU1MDEwOTQ4fDA&ixlib=rb-4.1.0&q=85'
              },
              {
                name: 'Dean Curtis',
                title: 'Sales Director',
                bio: 'Dean is recognized for his expertise in account-based marketing, hybrid selling strategies, and leveraging technology to enhance sales performance. His ability to build and maintain key client relationships, combined with a deep understanding of market trends and customer needs, has positioned him as a trusted advisor to both clients and colleagues.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU1MDEwOTQ4fDA&ixlib=rb-4.1.0&q=85'
              }
            ].map((member, index) => (
              <RevealOnScroll key={index} delay={index * 200}>
                <div className="group">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                        <p className="text-white/90">{member.title}</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-blue-600 font-semibold">{member.title}</p>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                        {member.bio}
                      </p>
                      
                      <div className="flex space-x-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                Contact Our Team
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section with Rich Graphics */}
      <section id="invest" className="py-32 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                Investment <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Opportunities</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We share all of our risk evaluation data with you to show what makes for a good investment.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <RevealOnScroll direction="left">
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl mr-4">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Selected Co-Investments</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Remember, you are generally investing into a specific company or individual with returns 
                    dictated by (i) the viability of the product or project they are offering and 
                    (ii) their ability bring it to fruition at the right price in the right timeframe.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    It is our job to ensure that both of these are positive and we then factor in our view 
                    of market conditions over the term the investment.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                  <ParallaxImage
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU1MDEwOTUzfDA&ixlib=rb-4.1.0&q=85"
                    alt="Business team collaboration"
                    className="w-full h-64 rounded-2xl mb-8"
                  />
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-8">Investment Process</h4>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                      <span className="text-gray-700">Due diligence and risk evaluation</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                      <span className="text-gray-700">Market conditions assessment</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                      <span className="text-gray-700">Co-investment commitment</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-lg font-bold">4</div>
                      <span className="text-gray-700">Fund release and share allocation</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Investment Services with Rich Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <RevealOnScroll>
              <div className="group">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 h-full shadow-xl border border-blue-100 transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105">
                  <div className="relative mb-8">
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Review</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Have you seen an investment opportunity that you are considering? Our investment banking 
                    background can help you make the final decision. We will carry out a full due diligence 
                    review of the project or product and give you our feedback completely free of charge.
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-100 rounded-lg p-4 italic">
                    (If we recommend the investment, we may even invest ourselves)
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="group">
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 h-full shadow-xl border border-purple-100 transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105">
                  <div className="relative mb-8">
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <PieChart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Review</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    How are your current investments performing? Are you getting paid on time, 
                    is there a threat of administration, or just a bad feeling about things on your part?
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    There are many ways to salvage poor investments, including a change of management control, 
                    a refinancing or a sale on our Secondary Market.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Investor Network Benefits with Rich Graphics */}
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 lg:p-16 border border-gray-100 shadow-2xl">
                {/* Background Office Image */}
                <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 overflow-hidden rounded-r-3xl">
                  <img 
                    src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzU1MDEwOTUzfDA&ixlib=rb-4.1.0&q=85" 
                    alt="Business meeting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Join Our Investor Network</h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                      Connect with our team to learn more about investment opportunities and how our 
                      dual-strategy approach can enhance your portfolio returns.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: Globe, title: 'Exclusive Deal Flow', desc: 'Access to pre-seed and mezzanine opportunities before they reach the market', color: 'from-blue-500 to-blue-600 border-blue-100 hover:border-blue-200' },
                      { icon: BarChart3, title: 'Quarterly Reporting', desc: 'Transparent performance updates and portfolio company progress', color: 'from-purple-500 to-purple-600 border-purple-100 hover:border-purple-200' },
                      { icon: Users, title: 'Co-Investment', desc: 'Opportunities for direct investment alongside the fund', color: 'from-indigo-500 to-indigo-600 border-indigo-100 hover:border-indigo-200' },
                      { icon: Award, title: 'Investor Events', desc: 'Regular networking events and portfolio company presentations', color: 'from-green-500 to-green-600 border-green-100 hover:border-green-200' }
                    ].map((benefit, index) => (
                      <RevealOnScroll key={index} delay={index * 100}>
                        <div className="text-center group">
                          <div className={`bg-white rounded-2xl p-8 shadow-xl border transition-all duration-500 hover:shadow-2xl hover:transform hover:scale-105 ${benefit.color.split(' ').slice(2).join(' ')}`}>
                            <div className={`bg-gradient-to-r ${benefit.color.split(' ')[0]} ${benefit.color.split(' ')[1]} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                              <benefit.icon className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-3">{benefit.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                          </div>
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Section with Luxury Office Background */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1525896544042-354764aa27e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBvZmZpY2V8ZW58MHx8fHwxNzU1MDEwOTM5fDA&ixlib=rb-4.1.0&q=85" 
            alt="Luxury office interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span></h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Ready to take control of your wealth? Contact our team for a confidential discussion 
                about your investment opportunities.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <RevealOnScroll direction="left">
              <div className="space-y-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">Phone</p>
                        <p className="text-white/80">+44 (0) 20 7xxx xxxx</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">Email</p>
                        <p className="text-white/80">info@ingenious-capital.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-2xl">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">Address</p>
                        <p className="text-white/80">London, United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h4 className="text-xl font-bold text-white mb-4">Investment Minimum</h4>
                  <p className="text-white/90 mb-6">
                    Membership of Ingenious Capital is <strong>free</strong>, but strictly limited. 
                    Availability is on a <strong>first-come, first-served</strong> basis.
                  </p>
                  <div className="text-4xl font-bold text-white mb-2">£10,000</div>
                  <p className="text-white/70">Minimum initial investment</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} direction="right">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-3">First Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm placeholder-white/60"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-3">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm placeholder-white/60"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-3">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm placeholder-white/60"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-3">Investment Interest</label>
                    <select className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm">
                      <option value="" className="bg-gray-900">Select investment range</option>
                      <option value="10k-50k" className="bg-gray-900">£10,000 - £50,000</option>
                      <option value="50k-100k" className="bg-gray-900">£50,000 - £100,000</option>
                      <option value="100k-500k" className="bg-gray-900">£100,000 - £500,000</option>
                      <option value="500k+" className="bg-gray-900">£500,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-3">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors resize-none backdrop-blur-sm placeholder-white/60"
                      placeholder="Tell us about your investment goals..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl text-lg font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
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
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gray-800 opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-2xl">I</span>
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
              <div className="flex space-x-4">
                {/* Social media icons can be added here */}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
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
};

export default IngeniousCapital;