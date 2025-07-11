import React from 'react'
import { DayPicker,  getDefaultClassNames } from 'react-day-picker';
import { useMainContext } from './context';
import 'react-day-picker/style.css';

const HeroDateSection = () => {
      const { selected, setSelected } = useMainContext();
      const maxBookingLength = 10
      const defaultClassNames = getDefaultClassNames();
  return (
    <div  className='sm:w-[80%] w-[95%] h-fit overflow-y-auto' >
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
                day_today: 'border-primary-500 border text-primary-500', 
                selected: `bg-accent-500 border-accent-500 text-accent-700`, 
                root: `${defaultClassNames.root} shadow-lg p-5`, 
                chevron: `${defaultClassNames.chevron} fill-primary-500` 
                
              }}
        
              />
    </div>
  )
}

export default HeroDateSection;
