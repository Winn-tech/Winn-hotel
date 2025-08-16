'use client'
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqData: FAQItem[] = [
    {
      question: "What are the check-in times and check-out times at Winn Hotel?",
      answer: "Check-in time is typically 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request and subject to availability."
    },
    {
      question: "What is the address of Winn Hotel?",
      answer: "Winn Hotel is located at Lagos State, Nigeria. The hotel is conveniently situated in the heart of Lagos business district."
    },
    {
      question: "Is Winn Hotel a smoke-free hotel?",
      answer: "Yes, Winn Hotel is a smoke-free hotel. Smoking is not permitted in guest rooms or indoor public areas. Designated smoking areas are available outdoors for guests who smoke."
    },
   
    {
      question: "Does Winn Hotel have cleanliness and sanitization measures in place?",
      answer: "Yes, the hotel follows comprehensive cleanliness and sanitization protocols. Enhanced cleaning procedures are implemented throughout the property, including guest rooms, public areas, and facilities to ensure guest safety and comfort."
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full mx-auto  sm:py-6 bg-gray-50 sm:min-h-screen my-5">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-gradient-to-r from-primary-800 to-accent-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full">
          <h1 className="text-base sm:text-lg font-medium">Frequently Asked Questions</h1>
        </div>
      </div>

     
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
       
        <div className="py-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-900">General</h2>
        </div>

      
        <div className="divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm sm:text-base font-medium text-primary-900 pr-3 sm:pr-4">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
             
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-sm sm:text-base text-accent-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer spacing */}
      <div className="mt-8"></div>
    </div>
  );
};

export default FAQ;