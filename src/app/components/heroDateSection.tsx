import React from 'react'
import { DayPicker, DateRange, getDefaultClassNames } from 'react-day-picker';
import { useMainContext } from './context';
import 'react-day-picker/style.css';

const HeroDateSection = () => {
      const { selected, setSelected } = useMainContext();
      const maxBookingLength = 10
      const defaultClassNames = getDefaultClassNames();
  return (
    <div  className='w-[80%]' >
         <DayPicker
                mode="range"
                selected={selected}
                onSelect={setSelected}
                numberOfMonths={2}
                fromMonth={ new Date() }
                fromDate={new Date()}
                disabled={{ before: new Date() }}
                max={maxBookingLength}
                required={true}
                classNames={{
                range_end: `${defaultClassNames.range_end} bg-green-500 text-white rounded-r-lg`,
                day_today: 'border-primary-500 border text-primary-500', // Change the color of today's date
                selected: `bg-accent-500 border-accent-500 text-accent-700`, // Highlight the selected day
                root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                chevron: `${defaultClassNames.chevron} fill-primary-500` // Change the color of the chevron
                
              }}
        
              />
    </div>
  )
}

export default HeroDateSection;
