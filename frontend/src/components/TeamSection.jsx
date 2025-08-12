import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, LinkedinIcon, Mail } from 'lucide-react';

const TeamSection = ({ FloatingCard }) => {
  const teamMembers = [
    {
      name: 'Daniel Moretti',
      title: 'Investment Director',
      bio: 'With extensive experience in the alternative investments sector, Daniel has a proven track record of managing and growing diversified portfolios across asset classes such as private equity, real estate, hedge funds, and structured products.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'daniel.moretti@ingenious-capital.com'
    },
    {
      name: 'Jude Zorlu',
      title: 'Finance Director',
      bio: 'Jude is recognized for his expertise in financial analysis, budgeting and forecasting and risk management. His main focus is on leveraging financial insights to support business growth, and he continues to drive value through innovative financial modelling.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'jude.zorlu@ingenious-capital.com'
    },
    {
      name: 'Dean Curtis',
      title: 'Sales Director',
      bio: 'Dean is recognized for his expertise in account-based marketing, hybrid selling strategies, and leveraging technology to enhance sales performance. His ability to build and maintain key client relationships, combined with a deep understanding of market trends and customer needs, has positioned him as a trusted advisor to both clients and colleagues.',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'dean.curtis@ingenious-capital.com'
    }
  ];

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Expert Investment Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our experienced team brings together deep expertise in venture capital, private equity, 
            and structured finance to deliver exceptional results for our investors.
          </p>
        </div>
        
        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <FloatingCard>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <p className="text-slate-600">Years Combined Experience</p>
              <p className="text-sm text-slate-500 mt-1">Venture capital, private equity, and structured finance</p>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={100}>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-slate-900 mb-2">£30M+</div>
              <p className="text-slate-600">Capital Deployed</p>
              <p className="text-sm text-slate-500 mt-1">Across 10+ early-stage and growth deals</p>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={200}>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-slate-900 mb-2">Multiple</div>
              <p className="text-slate-600">Successful Exits</p>
              <p className="text-sm text-slate-500 mt-1">To major acquirers and strategic buyers</p>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={300}>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-slate-900 mb-2">Diverse</div>
              <p className="text-slate-600">Sector Expertise</p>
              <p className="text-sm text-slate-500 mt-1">AI, biotech, fintech, and enterprise software</p>
            </div>
          </FloatingCard>
        </div>
        
        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <FloatingCard key={index} delay={index * 200}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-slate-200">{member.title}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {member.bio}
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <LinkedinIcon className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
          >
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;