import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, TrendingUp, Users, MapPin, DollarSign, Target, BarChart3, PieChart, Calendar, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slides = [
    // Slide 1: Title
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-slate-800 tracking-tight">
              Direct Cremation
            </h1>
            <h2 className="text-3xl font-light text-slate-600">
              Business Plan & Strategic Overview
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-slate-600"></div>
          <div className="text-lg text-slate-500 space-y-2">
            <p>Board Presentation</p>
            <p className="text-base">{new Date().toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      )
    },

    // Slide 2: Executive Summary
    {
      type: 'content',
      title: 'Executive Summary',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-600">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Business Overview</h3>
              <p className="text-slate-600 leading-relaxed">
                Establishment of a direct cremation business offering unattended cremation services across the UK, targeting the growing demand for affordable, dignified funeral alternatives.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-slate-600" />
                <span className="text-slate-700">Daily Capacity: <strong>16 cremations</strong></span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-slate-600" />
                <span className="text-slate-700">Service Range: <strong>£1,000 - £1,400</strong></span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-slate-600" />
                <span className="text-slate-700">Break-even: <strong>18-24 months</strong></span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800">Key Financial Projections</h3>
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600">Annual Revenue Potential</p>
                      <p className="text-2xl font-bold text-slate-800">£4.16M - £5.82M</p>
                      <p className="text-xs text-slate-500">At 80% capacity</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-slate-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600">Total Service Value</p>
                      <p className="text-2xl font-bold text-slate-800">£1,200 - £2,100</p>
                      <p className="text-xs text-slate-500">Per case including ancillary</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-slate-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Market Overview
    {
      type: 'content',
      title: 'Market Overview & Business Drivers',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Market Growth Drivers</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Cost Consciousness</h4>
                    <p className="text-slate-600 text-sm">Traditional funerals average £4,000-£5,000</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Changing Attitudes</h4>
                    <p className="text-slate-600 text-sm">Increasing acceptance of simpler arrangements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Demographics</h4>
                    <p className="text-slate-600 text-sm">600,000+ deaths annually in the UK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Market Position</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800">18-20%</div>
                  <div className="text-slate-600">Current market share of direct cremation</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800">15-20%</div>
                  <div className="text-slate-600">Annual growth rate</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 text-white p-6 rounded-xl">
              <h4 className="font-semibold mb-3">Cultural Shift</h4>
              <p className="text-slate-200 text-sm leading-relaxed">
                Move away from elaborate ceremonies toward celebration of life events
              </p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Service Structure
    {
      type: 'content',
      title: 'Service Structure & Pricing Strategy',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Core Service Pricing</h3>
              <div className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-slate-800">Standard Direct Cremation</h4>
                        <p className="text-slate-600 text-sm">Basic service package</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-800">£1,000 - £1,200</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-slate-800">Premium Direct Cremation</h4>
                        <p className="text-slate-600 text-sm">Enhanced service options</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-800">£1,200 - £1,400</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Ancillary Revenue Streams</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Coffin Upgrades</h4>
                  <p className="text-slate-600 text-sm">£150 - £800</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Collection Services</h4>
                  <p className="text-slate-600 text-sm">£100 - £300</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Memorial Products</h4>
                  <p className="text-slate-600 text-sm">£100 - £500</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Scattering Services</h4>
                  <p className="text-slate-600 text-sm">£200 - £600</p>
                </div>
              </div>
              
              <div className="bg-slate-800 text-white p-6 rounded-xl mt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold mb-2">Average Ancillary Revenue</h4>
                    <p className="text-slate-200 text-sm">Per service additional income</p>
                  </div>
                  <div className="text-2xl font-bold text-white">£350</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Operational Capacity
    {
      type: 'content',
      title: 'Operational Capacity & Fleet Management',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Fleet Specifications</h3>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-2">2</div>
                    <div className="text-slate-600">Adapted Removal Vans</div>
                    <div className="text-sm text-slate-500">4-coffin capacity each</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-2">16</div>
                    <div className="text-slate-600">Daily Maximum</div>
                    <div className="text-sm text-slate-500">Combined capacity</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Recommended Operating Level:</span>
                    <span className="font-semibold text-slate-800">12-13 daily (75-80%)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 text-white p-6 rounded-xl">
                <h4 className="font-semibold mb-3">Annual Capacity</h4>
                <div className="text-2xl font-bold">4,380 - 5,840 services</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Geographic Coverage Strategy</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Central Region</h4>
                    <p className="text-slate-600 text-sm">Birmingham/Nottingham hub</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Southern/Western Region</h4>
                    <p className="text-slate-600 text-sm">Reading/Southampton hub</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">London Metropolitan/Eastern</h4>
                    <p className="text-slate-600 text-sm">Dedicated routes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-600">
              <h4 className="font-semibold text-slate-800 mb-3">Crematorium Partnerships</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Municipal crematoriums (cost advantage)</li>
                <li>• Private crematorium operators</li>
                <li>• Volume discounts (10-15% reduction)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Financial Projections
    {
      type: 'content',
      title: 'Revenue Projections',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Conservative Scenario</h3>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-slate-800">70% Capacity</div>
                  <div className="text-slate-600 text-sm">3,066 services annually</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Base Revenue:</span>
                    <span className="font-semibold text-slate-800">£3.07M - £4.29M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Ancillary Revenue:</span>
                    <span className="font-semibold text-slate-800">£1.07M</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-800 font-semibold">Total Annual Revenue:</span>
                      <span className="font-bold text-slate-800 text-lg">£4.14M - £5.36M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Optimistic Scenario</h3>
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold">80% Capacity</div>
                  <div className="text-slate-200 text-sm">3,504 services annually</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200">Base Revenue:</span>
                    <span className="font-semibold text-white">£3.50M - £4.91M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200">Ancillary Revenue:</span>
                    <span className="font-semibold text-white">£1.23M</span>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Annual Revenue:</span>
                      <span className="font-bold text-white text-lg">£4.73M - £6.14M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-600">
              <h4 className="font-semibold text-slate-800 mb-3">Revenue Growth Trajectory</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">50%</div>
                  <div className="text-slate-600 text-sm">Year 1</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">75%</div>
                  <div className="text-slate-600 text-sm">Year 2</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">80%</div>
                  <div className="text-slate-600 text-sm">Year 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Cost Structure
    {
      type: 'content',
      title: 'Cost Structure Analysis',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Direct Costs per Service</h3>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-700">Crematorium Fees</span>
                  <span className="font-semibold text-slate-800">£225 - £250</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-700">Coffin (basic)</span>
                  <span className="font-semibold text-slate-800">£80 - £100</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-700">Fuel & Vehicle Costs</span>
                  <span className="font-semibold text-slate-800">£40 - £80</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-700">Staff Costs</span>
                  <span className="font-semibold text-slate-800">£60 - £100</span>
                </div>
                
                <div className="bg-slate-800 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Direct Costs</span>
                    <span className="font-bold text-lg">£405 - £530</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Fixed Monthly Costs</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Fleet Lease/Finance</span>
                  <span className="font-semibold text-slate-800">£1,400</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Insurance</span>
                  <span className="font-semibold text-slate-800">£1,200</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Premises</span>
                  <span className="font-semibold text-slate-800">£3,000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Staff (permanent team)</span>
                  <span className="font-semibold text-slate-800">£9,000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Marketing & Digital</span>
                  <span className="font-semibold text-slate-800">£2,500</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-700">Compliance & Licensing</span>
                  <span className="font-semibold text-slate-800">£500</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <div className="bg-slate-800 text-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Fixed Costs</span>
                      <span className="font-bold text-lg">£17,600 monthly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Competitive Advantages
    {
      type: 'content',
      title: 'Key Business Drivers & Differentiation',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Competitive Advantages</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-800 p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Scale Economics</h4>
                      <p className="text-slate-600 text-sm">High daily capacity reduces per-unit costs</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-800 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Geographic Coverage</h4>
                      <p className="text-slate-600 text-sm">Nationwide service availability</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-800 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Transparent Pricing</h4>
                      <p className="text-slate-600 text-sm">Clear, upfront cost structure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Service Excellence</h3>
              <div className="space-y-4">
                <div className="bg-slate-800 text-white p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <Zap className="h-6 w-6 text-white" />
                    <div>
                      <h4 className="font-semibold mb-2">Digital-First Approach</h4>
                      <p className="text-slate-200 text-sm">Online booking and management</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800 text-white p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 text-white" />
                    <div>
                      <h4 className="font-semibold mb-2">Rapid Service</h4>
                      <p className="text-slate-200 text-sm">5-7 day turnaround standard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-600">
              <h4 className="font-semibold text-slate-800 mb-4">Customer Acquisition Strategy</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Digital Marketing: SEO-optimized website, Google Ads</li>
                <li>• Healthcare Partnerships: Hospitals, nursing homes, hospices</li>
                <li>• Funeral Director Referrals: Commission structure</li>
                <li>• Direct Consumer: Bereavement support groups</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 9: Financial Projections Summary
    {
      type: 'content',
      title: 'Three-Year Financial Projections',
      content: (
        <div className="h-full space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Year 1</h3>
                  <div className="text-sm text-slate-600 mb-2">Ramp-up Period - 50% Capacity</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-800">2,190</div>
                      <div className="text-slate-600 text-sm">Services</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800">£2.63M - £3.50M</div>
                      <div className="text-slate-600 text-sm">Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800">£928K - £1.74M</div>
                      <div className="text-slate-600 text-sm">Net Profit (pre-tax)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 bg-gradient-to-r from-slate-100 to-slate-200">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Year 2</h3>
                  <div className="text-sm text-slate-600 mb-2">Growth Phase - 75% Capacity</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-800">3,285</div>
                      <div className="text-slate-600 text-sm">Services</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800">£3.94M - £5.25M</div>
                      <div className="text-slate-600 text-sm">Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800">£1.54M - £2.76M</div>
                      <div className="text-slate-600 text-sm">Net Profit (pre-tax)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Year 3</h3>
                  <div className="text-sm text-slate-200 mb-2">Optimized - 80% Capacity</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold">3,504</div>
                      <div className="text-slate-200 text-sm">Services</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">£4.20M - £5.60M</div>
                      <div className="text-slate-200 text-sm">Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">£1.66M - £2.96M</div>
                      <div className="text-slate-200 text-sm">Net Profit (pre-tax)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Revenue Growth Trajectory</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Year 1-2 Growth:</span>
                  <span className="font-semibold text-slate-800">50% increase</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Year 2-3 Growth:</span>
                  <span className="font-semibold text-slate-800">7% increase</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Key Milestones</span>
              </h4>
              <div className="space-y-2 text-slate-600 text-sm">
                <div>• Break-even achieved in 18-24 months</div>
                <div>• Market position established by Year 2</div>
                <div>• Full operational efficiency by Year 3</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Risk & Implementation
    {
      type: 'content',
      title: 'Risk Management & Implementation Timeline',
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Key Risks & Mitigation</h3>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Crematorium Capacity</h4>
                      <p className="text-red-600 text-sm">Multiple facility partnerships</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Regulatory Changes</h4>
                      <p className="text-yellow-600 text-sm">Compliance buffer & legal counsel</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Seasonal Variations</h4>
                      <p className="text-blue-600 text-sm">Winter 20-30% higher demand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-600">
              <h4 className="font-semibold text-slate-800 mb-3">Mitigation Strategies</h4>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• Diversified supplier base</li>
                <li>• Technology investment in optimization</li>
                <li>• Comprehensive insurance coverage</li>
                <li>• 90-day operating capital reserves</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Implementation Timeline</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-3">Phase 1: Foundation (Months 1-2)</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Secure crematorium partnerships</li>
                    <li>• Vehicle procurement and adaptation</li>
                    <li>• Licensing and compliance setup</li>
                    <li>• Website and booking system development</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-3">Phase 2: Launch (Months 3-4)</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Soft launch in 2-3 regions</li>
                    <li>• Staff recruitment and training</li>
                    <li>• Marketing campaign initiation</li>
                    <li>• Partnership development</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-xl">
                  <h4 className="font-semibold mb-3">Phase 3: Scale (Months 5-6)</h4>
                  <ul className="space-y-1 text-slate-200 text-sm">
                    <li>• National service rollout</li>
                    <li>• Capacity optimization</li>
                    <li>• Ancillary service development</li>
                    <li>• Performance monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Conclusion
    {
      type: 'conclusion',
      content: (
        <div className="flex flex-col justify-center h-full space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-slate-800">Strategic Opportunity</h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              The direct cremation business presents a compelling opportunity in a growing market segment. 
              With proper execution, we can achieve strong profitability while serving families with dignity and affordability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Success Critical Factors</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-slate-600 mt-1" />
                  <span className="text-slate-700">Operational excellence in logistics and scheduling</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-slate-600 mt-1" />
                  <span className="text-slate-700">Compassionate customer service during sensitive times</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-slate-600 mt-1" />
                  <span className="text-slate-700">Strong crematorium partnerships and relationships</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-slate-600 mt-1" />
                  <span className="text-slate-700">Effective digital marketing and customer acquisition</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6">Competitive Advantages</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Scale operations with cost efficiency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Comprehensive service offerings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Efficient nationwide logistics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Multiple competitive advantages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-slate-800">Direct Cremation Business Plan</h2>
            <div className="text-sm text-slate-500">
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Content - A4 Landscape dimensions */}
      <div className="pt-20 p-8 flex justify-center">
        <div 
          className="w-[1123px] h-[794px] bg-white shadow-2xl border border-slate-200 overflow-hidden"
          style={{
            aspectRatio: '1123/794' // A4 landscape ratio
          }}
        >
          <div className="h-full p-12">
            {slides[currentSlide].type === 'title' ? (
              slides[currentSlide].content
            ) : slides[currentSlide].type === 'conclusion' ? (
              slides[currentSlide].content
            ) : (
              <div className="h-full flex flex-col">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-slate-800 mb-2">
                    {slides[currentSlide].title}
                  </h1>
                  <div className="w-20 h-1 bg-slate-600"></div>
                </div>
                <div className="flex-1">
                  {slides[currentSlide].content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;