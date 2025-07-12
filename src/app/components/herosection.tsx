'use client';
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useMainContext } from './context';
import HeroDateSection from './heroDateSection';
import { redirect } from 'next/navigation';

const HotelHeroSection = () => {
  const { selected, guests, setGuests  } = useMainContext();
 
  const [isLoading, setIsLoading] = useState(false);
  const [showDate, setDate] = useState(false);
  
  // Helper function to format date for display
  const formatDateForDisplay = (date: Date | string | null | undefined):string => {
    if (!date) return 'Select Date';
    if (date instanceof Date) {
      return date.toLocaleDateString(); 
    }
    return date.toString();
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      redirect('/suites')
    }, 1000);
  };

  return (
    <div className="min-h-screen max-h-fit bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent "></div>
        <div 
          className="h-screen bg-cover bg-center bg-no-repeat transform transition-transform duration-20000 hover:scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-pulse">
              Winn Hotels
            </h1>
            <p className="text-2xl md:text-3xl mb-12 opacity-90 animate-bounce text-primary-50">
              Luxury stays around the world
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-5xl mx-auto border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5 transition-all duration-300 group-hover:text-primary-300 group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/20 focus:scale-105"
                    value="Lagos, Nigeria"
                    readOnly
                  />
                </div>
                
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5 transition-all duration-300 group-hover:text-primary-300 group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Check In Date"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/20 focus:scale-105"
                    value={formatDateForDisplay(selected?.from)}
                    onClick={() => setDate(!showDate)}
                    readOnly
                  />
                </div>
                
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5 transition-all duration-300 group-hover:text-primary-300 group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Check Out Date"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/20 focus:scale-105"
                    value={formatDateForDisplay(selected?.to)}
                    // onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                    onClick={() => setDate(!showDate)}
                    readOnly
                  />
                </div>
                
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5 transition-all duration-300 group-hover:text-primary-300 group-hover:scale-110" />
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/20 appearance-none focus:scale-105"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    onClick={() => setDate(false)}
                  >
                    <option value={1} className="bg-accent-200">1 Guest</option>
                    <option value={2} className="bg-accent-200">2 Guests</option>
                    <option value={3} className="bg-accent-200">3 Guests</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5 pointer-events-none transition-all duration-300 group-hover:text-primary-300" />
                </div>
              </div>
              {
                showDate && (
                  <HeroDateSection />
                )
              }
              <button
                onClick={handleSearch}
                className="w-full mt-8 bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                    Search Hotels
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HotelHeroSection;