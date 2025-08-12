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
  const [currentPage, setCurrentPage] = useState('logo');

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
        element.scrollIntoView({ behavior: 'smooth' });
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
    <div className="h-screen w-screen overflow-hidden bg-gray-900 flex flex-col">
      {/* Navigation Links - Top */}
      <nav className="w-full py-8">
        <div className="flex justify-center items-center space-x-16">
          {[
            { id: 'about', label: 'Our Approach' },
            { id: 'services', label: 'Services' },
            { id: 'team', label: 'Team' },
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
      <section id="about" className="pt-32 pb-16 bg-gray-800 relative overflow-hidden mt-20">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-xl lg:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-gray-700">
              As a sophisticated or high net worth investor, it is unlikely that we are the first investment portal that you have visited, and it is with that in mind that we try to do things differently. 
              Our focus is you and how we can help you to declutter your finances and simplify your investments.
            </p>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Our <span className="bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">Approach</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              To familiarize yourself with non-traditional, alternative investments requires a partner 
              who has a substantial stake in the game themselves to ensure that the decision
              making is in everybody's best interests. Ingenious Capital does exactly that by co-investing
              in every project that it promotes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-700">
                <h3 className="text-4xl font-bold text-white mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-2xl mr-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  Enhanced Liquidity
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Enhanced profits come at a price – lack of liquidity. 
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent mb-6">
                  UNTIL NOW...
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Ingenious Capital invests into a diverse portfolio of assets ranging from commodities, 
                  shares, ETF's and AIM listed Companies to maintain liquidity and create income. 
                  This philosophy means that <span className="text-xl font-bold text-white bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent">50% of your funds invested are available to you on 48 hours notice, 
                  with the other 50% on a maximum of 180 days notice.</span>
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-700">
                <img
                  src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg"
                  alt="Financial charts"
                  className="w-full h-64 rounded-2xl mb-8 object-cover"
                />
                
                <h4 className="text-3xl font-bold text-white mb-6 text-center">Investment Returns</h4>
                <p className="text-lg text-gray-300 mb-8 text-center">
                  A world with targeted returns of 1.5 to 6 times initial investment and IRR's of 25-30%.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-teal-500/30">
                    <div className="text-4xl font-bold text-teal-500 mb-2">1.5-6x</div>
                    <div className="text-gray-300 font-medium">Return Multiple</div>
                    <div className="mt-3 bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-orange-500/30">
                    <div className="text-4xl font-bold text-orange-500 mb-2">25-30%</div>
                    <div className="text-gray-300 font-medium">Targeted IRR</div>
                    <div className="mt-3 bg-gray-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-900 relative overflow-hidden">
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

      {/* Team Section */}
      <section id="team" className="py-32 bg-gray-800 relative overflow-hidden">
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
              <div key={index} className="group">
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-700 hover:shadow-2xl hover:transform hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-teal-500 font-semibold">{member.title}</p>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="invest" className="py-32 bg-gray-900 relative overflow-hidden">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
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
                      <p className="text-gray-300">+44 (0) 20 7xxx xxxx</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-2xl">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Email</p>
                      <p className="text-gray-300">info@ingenious-capital.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 rounded-2xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Address</p>
                      <p className="text-gray-300">London, United Kingdom</p>
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
                <div className="text-4xl font-bold text-white mb-2">£10,000</div>
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
                    <option value="10k-50k" className="bg-gray-900">£10,000 - £50,000</option>
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
                  type="submit"
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
  return currentPage === 'logo' ? <LogoPage /> : <MainSite />;
};

export default IngeniousCapital;