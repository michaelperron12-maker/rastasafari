'use client';

import { useState, useMemo } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const AVAILABLE_TIMES = ['9h00', '12h00', '14h30'];

// Simulate availability - in production, this would come from an API
const getAvailability = (date: Date): { [key: string]: number } => {
  const day = date.getDate();
  // Simulate different availability levels
  if (day % 7 === 0) return { '9h00': 0, '12h00': 2, '14h30': 5 };
  if (day % 5 === 0) return { '9h00': 3, '12h00': 0, '14h30': 8 };
  if (day % 3 === 0) return { '9h00': 6, '12h00': 4, '14h30': 0 };
  return { '9h00': 8, '12h00': 6, '14h30': 10 };
};

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function Calendar({ selectedDate, onDateSelect, selectedTime, onTimeSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateSelectable = (date: Date | null): boolean => {
    if (!date) return false;
    return date >= today;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getAvailabilityClass = (spots: number): string => {
    if (spots === 0) return 'bg-red-500/20 text-red-400 cursor-not-allowed';
    if (spots <= 3) return 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30';
    return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
  };

  const getAvailabilityLabel = (spots: number): string => {
    if (spots === 0) return 'Complet';
    if (spots <= 3) return `${spots} places`;
    return 'Disponible';
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Mois précédent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-xl font-semibold">
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Mois suivant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((day) => (
          <div key={day} className="text-center text-sm text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => (
          <button
            key={index}
            onClick={() => date && isDateSelectable(date) && onDateSelect(date)}
            disabled={!isDateSelectable(date)}
            className={`
              aspect-square p-2 rounded-lg text-center transition-all
              ${!date ? 'invisible' : ''}
              ${isDateSelectable(date)
                ? 'hover:bg-amber-500/20 cursor-pointer'
                : 'text-gray-600 cursor-not-allowed'}
              ${isDateSelected(date)
                ? 'bg-amber-500 text-black font-bold'
                : ''}
            `}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-lg font-semibold mb-4">
            Sessions disponibles le {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AVAILABLE_TIMES.map((time) => {
              const availability = getAvailability(selectedDate);
              const spots = availability[time];
              const isAvailable = spots > 0;
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  onClick={() => isAvailable && onTimeSelect(time)}
                  disabled={!isAvailable}
                  className={`
                    p-4 rounded-xl border-2 transition-all
                    ${isSelected
                      ? 'border-amber-500 bg-amber-500/20'
                      : 'border-white/10 hover:border-white/30'}
                    ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="text-xl font-bold mb-1">{time}</div>
                  <div className={`text-sm ${getAvailabilityClass(spots)} px-2 py-1 rounded-full inline-block`}>
                    {getAvailabilityLabel(spots)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
