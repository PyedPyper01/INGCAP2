import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = ({ FloatingCard }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Ingenious Capital Ltd?",
          answer: "Ingenious Capital Ltd is a fintech platform designed to provide innovative investment solutions. We offer a range of funding options for businesses and unique investment opportunities for investors. Our platform combines expertise in private equity, real estate, alternative assets, and more, ensuring our investors achieve significant returns through well-managed, tax-efficient strategies."
        },
        {
          question: "What is an equity investment?",
          answer: "An equity investment involves purchasing shares of a company, giving you partial ownership in that business. As an equity investor, you benefit from the company's growth and profitability through dividends and capital appreciation. This type of investment carries the potential for high returns but also comes with a higher risk compared to debt investments."
        },
        {
          question: "Am I eligible to invest with Ingenious Capital Ltd?",
          answer: "To invest on Ingenious Capital Ltd, you must be a sophisticated investor or a high-net-worth individual. This typically means you have significant investment experience, knowledge of financial markets, or substantial assets. We require all investors to complete a suitability assessment to ensure our investment opportunities align with their financial goals and risk tolerance."
        }
      ]
    },
    {
      category: "Making Your Investment",
      questions: [
        {
          question: "What is the minimum amount I can invest?",
          answer: "The minimum amount you can invest varies depending on the specific investment opportunity. Generally, the minimum investment amount is designed to be accessible, allowing a wide range of investors to participate. Specific details for each investment can be found on the respective pitch page."
        },
        {
          question: "Can Ingenious Capital Ltd give me advice on what to invest in?",
          answer: "Ingenious Capital Ltd provides detailed information and analysis on each investment opportunity to help you make informed decisions. However, we do not offer personalized financial advice. We recommend consulting with a qualified financial advisor to determine which investments align best with your financial goals and risk tolerance."
        },
        {
          question: "How is the share price calculated?",
          answer: "The share price for each investment is calculated based on a thorough evaluation of the company's current financial status, market conditions, and growth potential. This includes an assessment of the company's assets, liabilities, revenue, and future earning prospects. The share price reflects the fair market value of the company's equity at the time of the offering."
        }
      ]
    },
    {
      category: "Tax Relief",
      questions: [
        {
          question: "What tax reliefs are available?",
          answer: "Ingenious Capital Ltd offers various investment opportunities that come with significant tax reliefs, especially under the UK government's Enterprise Investment Scheme (EIS) and Seed Enterprise Investment Scheme (SEIS). These schemes provide: Income Tax Relief (up to 30% for EIS, 50% for SEIS), Capital Gains Tax Deferral Relief, Inheritance Tax Relief (100% after 2 years), and Loss Relief against income or capital gains tax liabilities."
        },
        {
          question: "Is there a minimum holding period to claim relief with EIS/SEIS?",
          answer: "Yes, to qualify for the tax reliefs provided by EIS and SEIS, you must hold your investment for a minimum of three years from the date of issue of the shares. If you sell your shares before this period, you will lose the tax relief and may have to repay any relief already claimed."
        },
        {
          question: "When will I receive my EIS/SEIS certificates?",
          answer: "EIS and SEIS certificates are typically issued after the company has been trading for a minimum period and has complied with the necessary regulations. Once the company receives confirmation from HMRC, they will issue the certificates to investors. This process can take several weeks to a few months after the investment is made."
        }
      ]
    },
    {
      category: "Returns & Management",
      questions: [
        {
          question: "How can I make a return on my investment?",
          answer: "You can make a return on your investment through various means: Dividends (periodic payments from company profits), Capital Gains (profit when selling shares at higher price), Interest Payments (for debt investments), and Exit Events (selling during acquisition, merger, or IPO)."
        },
        {
          question: "Can I transfer my shares?",
          answer: "Yes, you can transfer your shares, but the process and conditions may vary depending on the type of shares and the company's policies. Typically, you may need to obtain approval, follow transfer procedures, complete documentation, and notify Ingenious Capital Ltd about the transfer to update records."
        },
        {
          question: "What happens after I've invested?",
          answer: "After you've made an investment, you will receive a confirmation email detailing the specifics of your investment. Your funds will be allocated to the chosen opportunity, and you will become an equity holder. You can track progress through your Ingenious Capital Ltd account with access to detailed reports and updates."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Find answers to common questions about investing with Ingenious Capital
          </p>
        </div>

        {faqData.map((category, categoryIndex) => (
          <FloatingCard key={categoryIndex} delay={categoryIndex * 100}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const faqIndex = `${categoryIndex}-${index}`;
                  const isOpen = openFAQ === faqIndex;
                  
                  return (
                    <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faqIndex)}
                        className="w-full px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-100"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-slate-900 pr-4">
                            {faq.question}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-slate-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 py-4 bg-white">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FloatingCard>
        ))}

        <div className="text-center mt-12">
          <FloatingCard>
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-slate-600 mb-6">
                Our team is here to help you understand our investment opportunities and process.
              </p>
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;