'use client';
import { DayPicker, DateRange, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useMainContext } from './context';

interface DatePickerProps {
  numNights: number;
}


function DatePicker({numNights}: DatePickerProps) {
  
  const { selected, setSelected } = useMainContext();
  const maxBookingLength = numNights; 
  console.log(maxBookingLength, 'maxBookingLength');
  
const defaultClassNames = getDefaultClassNames();
  return (
    <div>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
        numberOfMonths={2}
        fromMonth={ new Date() }
        fromDate={new Date()}
        disabled={{ before: new Date() }}
        max={maxBookingLength}
        classNames={{
        range_end: `${defaultClassNames.range_end} bg-green-500 text-white rounded-r-lg`,
        day_today: 'border-primary-500 border text-primary-500', // Change the color of today's date
        selected: `bg-accent-500 border-accent-500 text-accent-700`, // Highlight the selected day
        root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
        chevron: `${defaultClassNames.chevron} fill-primary-500` // Change the color of the chevron
        
      }}

      />
      <p>
        {selected?.from && selected?.to
          ? `Selected: ${selected.from.toLocaleDateString()} → ${selected.to.toLocaleDateString()}`
          : 'Pick a day range.'}
      </p>
    </div>
  );
}

export default DatePicker;
