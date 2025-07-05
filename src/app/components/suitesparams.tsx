'use client'
import React from 'react'
import { useMainContext } from '../components/context'
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

const Suitesparams = () => {
    const { selected } = useMainContext();
    
    if(!selected?.to ){
        return ''
    }

    // Helper function to safely format dates LOL
    const formatDate = (date: Date | string | null | undefined): string => {
        if (!date) return 'Not selected';
        if (date instanceof Date) {
            return date.toDateString();
        }
        return date.toString();
    };

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10'>
            <div className='flex flex-col sm:flex-row gap-4 lg:gap-6'>
                <div className='border-2 border-accent-700 rounded-lg px-4 sm:px-6 lg:px-8 py-4 w-full flex justify-between items-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                    <span className='flex gap-2.5 items-center font-bold text-accent-400'>
                        <Calendar className="text-accent-400 w-5 h-5" />
                        <span className='hidden sm:inline lg:inline'>Check in</span>
                        <span className='sm:hidden lg:hidden'>In</span>
                    </span>
                    <span className='text-primary-500 font-medium text-sm lg:text-base'>
                        {formatDate(selected?.from)}
                    </span>
                </div>

                <div className='border-2 border-accent-700 rounded-lg px-4 sm:px-6 lg:px-8 py-4 w-full flex justify-between items-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                    <span className='flex gap-2.5 items-center font-bold text-accent-400'>
                        <Calendar className="text-accent-400 w-5 h-5" />
                        <span className='hidden sm:inline lg:inline'>Check out</span>
                        <span className='sm:hidden lg:hidden'>Out</span>
                    </span>
                    <span className='text-primary-500 font-medium text-sm lg:text-base'>
                        {formatDate(selected?.to)}
                    </span>
                </div>

                <div className='border-2 border-accent-700 rounded-lg px-4 sm:px-6 lg:px-8 py-4 w-full flex justify-between items-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                    <span className='flex gap-2.5 items-center font-bold text-accent-400'>
                        <Users className="text-accent-400 w-5 h-5" />
                        <span className='hidden sm:inline lg:inline'>Max guest:</span>
                        <span className='sm:hidden lg:hidden'>Guests</span>
                    </span>
                    <span className='text-primary-500 font-medium text-sm lg:text-base'>
                        Three adults
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Suitesparams