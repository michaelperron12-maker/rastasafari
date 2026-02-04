'use client';

import { useState } from 'react';
import Image from 'next/image';

// =============================================================================
// CONSTANTS
// =============================================================================

const STEPS = [
  { number: 1, title: 'Date', description: 'Choose a date' },
  { number: 2, title: 'Session', description: 'Select time slot' },
  { number: 3, title: 'Participants', description: 'Number of guests' },
  { number: 4, title: 'Information', description: 'Your details' },
  { number: 5, title: 'Payment', description: 'Confirm & pay' },
];

const AVAILABLE_SESSIONS = [
  { id: '9am', time: '9:00 AM', label: 'Morning Session' },
  { id: '12pm', time: '12:00 PM', label: 'Midday Session' },
  { id: '2:30pm', time: '2:30 PM', label: 'Afternoon Session' },
];

const PRICE_PER_PERSON = 165;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Rasta Colors
const RASTA = {
  red: '#E31C23',
  gold: '#FED100',
  green: '#009B3A',
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Step 1 - Date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Step 2 - Session
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Step 3 - Participants
  const [participants, setParticipants] = useState(2);

  // Step 4 - Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 5 - Payment (demo mode)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // =============================================================================
  // CALCULATIONS
  // =============================================================================

  const totalPrice = participants * PRICE_PER_PERSON;

  // =============================================================================
  // CALENDAR LOGIC
  // =============================================================================

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const isDateSelectable = (date: Date | null): boolean => {
    if (!date) return false;
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck >= today;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  // =============================================================================
  // NAVIGATION
  // =============================================================================

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return selectedDate !== null;
      case 2:
        return selectedSession !== null;
      case 3:
        return participants >= 1;
      case 4:
        return fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
      case 5:
        return cardNumber.length >= 16 && cardExpiry.length >= 5 && cardCvc.length >= 3;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (currentStep < 5 && canGoNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // =============================================================================
  // PAYMENT HANDLING (DEMO MODE)
  // =============================================================================

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 2000);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // =============================================================================
  // CONFIRMATION MODAL
  // =============================================================================

  if (showConfirmation) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-[#002200] to-black text-white">
        {/* Hero Background */}
        <div className="relative h-[40vh] overflow-hidden">
          <Image
            src="/images/rastasafari/hero-atv.jpg"
            alt="Rastasafari Experience"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>

        {/* Confirmation Content */}
        <div className="max-w-2xl mx-auto px-4 -mt-32 relative z-10 pb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
            {/* Success Icon */}
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: RASTA.green }}
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Booking <span style={{ color: RASTA.gold }}>Confirmed!</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8">
              Thank you for booking your Rastasafari Experience! A confirmation email has been sent to{' '}
              <span style={{ color: RASTA.gold }}>{email}</span>
            </p>

            {/* Booking Details */}
            <div className="bg-black/30 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-lg mb-4" style={{ color: RASTA.gold }}>Booking Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Confirmation Number:</span>
                  <span className="font-mono font-bold">RSF-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session:</span>
                  <span>{AVAILABLE_SESSIONS.find(s => s.id === selectedSession)?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Participants:</span>
                  <span>{participants} {participants > 1 ? 'people' : 'person'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span>{fullName}</span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Paid:</span>
                    <span className="font-bold" style={{ color: RASTA.gold }}>${totalPrice} USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-black/30 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-lg mb-4" style={{ color: RASTA.green }}>What&apos;s Next?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span style={{ color: RASTA.gold }}>1.</span>
                  <span>Check your email for detailed pickup instructions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: RASTA.gold }}>2.</span>
                  <span>We&apos;ll contact you via WhatsApp 24h before your tour</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: RASTA.gold }}>3.</span>
                  <span>Wear comfortable clothes and bring sunscreen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: RASTA.gold }}>4.</span>
                  <span>Get ready for an unforgettable Jamaican adventure!</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/"
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-center transition-all hover:scale-105"
                style={{ backgroundColor: RASTA.green }}
              >
                Return to Home
              </a>
              <a
                href={`https://wa.me/18761234567?text=Hello!%20I%20just%20booked%20a%20Rastasafari%20Experience%20for%20${formatDate(selectedDate)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 rounded-xl font-semibold text-center transition-all hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: RASTA.gold, color: '#000' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contact Us
              </a>
            </div>

            {/* Demo Notice */}
            <div className="mt-8 p-4 rounded-xl text-sm text-gray-400" style={{ backgroundColor: 'rgba(254, 209, 0, 0.1)', borderColor: RASTA.gold, borderWidth: 1 }}>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: RASTA.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>This is a demo booking. In production, payment would be processed through Stripe.</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =============================================================================
  // MAIN BOOKING FORM
  // =============================================================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#002200] to-black text-white">
      {/* Hero Header */}
      <div className="relative h-[35vh] md:h-[40vh] overflow-hidden">
        <Image
          src="/images/rastasafari/hero-atv.jpg"
          alt="Rastasafari Adventure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Book Your <span style={{ color: RASTA.gold }}>Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Experience the authentic Rastafari culture with our all-inclusive tour
          </p>
          <div className="mt-4 flex items-center gap-2 text-2xl font-bold">
            <span style={{ color: RASTA.gold }}>${PRICE_PER_PERSON}</span>
            <span className="text-gray-300 text-base font-normal">USD per person</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Step Indicator */}
        <div className="mb-8">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: RASTA.gold }} className="font-semibold">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-white font-medium">
                {STEPS[currentStep - 1]?.title}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentStep / STEPS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${RASTA.red}, ${RASTA.gold}, ${RASTA.green})`
                }}
              />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300"
                      style={{
                        backgroundColor: isCompleted ? RASTA.green : isCurrent ? RASTA.gold : 'rgba(255,255,255,0.1)',
                        color: isCompleted || isCurrent ? '#000' : '#9CA3AF',
                        boxShadow: isCurrent ? `0 0 0 4px ${RASTA.gold}40` : 'none'
                      }}
                    >
                      {isCompleted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className="text-sm font-semibold"
                        style={{ color: isCurrent ? RASTA.gold : isCompleted ? RASTA.green : '#9CA3AF' }}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden lg:block">
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {index < STEPS.length - 1 && (
                    <div className="flex-1 h-1 mx-4 rounded-full bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: isCompleted ? RASTA.green : isCurrent ? RASTA.gold : 'transparent',
                          width: isCompleted ? '100%' : isCurrent ? '50%' : '0%'
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">

              {/* ============================================================= */}
              {/* STEP 1 - DATE SELECTION */}
              {/* ============================================================= */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: RASTA.gold }}
                    >
                      1
                    </span>
                    Choose Your Date
                  </h2>

                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-semibold">
                      {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
                    {getDaysInMonth().map((date, index) => (
                      <button
                        key={index}
                        onClick={() => date && isDateSelectable(date) && setSelectedDate(date)}
                        disabled={!isDateSelectable(date)}
                        className={`
                          aspect-square p-2 rounded-lg text-center transition-all
                          ${!date ? 'invisible' : ''}
                          ${isDateSelectable(date) && !isDateSelected(date)
                            ? 'hover:bg-white/20 cursor-pointer'
                            : ''}
                          ${!isDateSelectable(date) && date ? 'text-gray-600 cursor-not-allowed' : ''}
                        `}
                        style={{
                          backgroundColor: isDateSelected(date) ? RASTA.gold : 'transparent',
                          color: isDateSelected(date) ? '#000' : undefined
                        }}
                      >
                        {date?.getDate()}
                      </button>
                    ))}
                  </div>

                  {selectedDate && (
                    <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${RASTA.green}20`, borderColor: RASTA.green, borderWidth: 1 }}>
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: RASTA.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Selected: <strong>{formatDate(selectedDate)}</strong></span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 2 - SESSION SELECTION */}
              {/* ============================================================= */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: RASTA.gold }}
                    >
                      2
                    </span>
                    Select Your Session
                  </h2>

                  <p className="text-gray-300 mb-6">
                    Choose a session for <strong style={{ color: RASTA.gold }}>{formatDate(selectedDate)}</strong>
                  </p>

                  <div className="grid gap-4">
                    {AVAILABLE_SESSIONS.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session.id)}
                        className={`
                          p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02]
                          ${selectedSession === session.id ? '' : 'border-white/10 hover:border-white/30 bg-white/5'}
                        `}
                        style={{
                          borderColor: selectedSession === session.id ? RASTA.gold : undefined,
                          backgroundColor: selectedSession === session.id ? `${RASTA.gold}20` : undefined
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold" style={{ color: selectedSession === session.id ? RASTA.gold : undefined }}>
                              {session.time}
                            </div>
                            <div className="text-gray-400">{session.label}</div>
                          </div>
                          <div
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: `${RASTA.green}30`,
                              color: RASTA.green
                            }}
                          >
                            Available
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl text-sm" style={{ backgroundColor: `${RASTA.gold}10`, borderColor: RASTA.gold, borderWidth: 1 }}>
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RASTA.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Each session includes round-trip transportation, ATV tour, authentic Jamaican lunch, and local drinks. Duration: approximately 5-6 hours.
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 3 - PARTICIPANTS */}
              {/* ============================================================= */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: RASTA.gold }}
                    >
                      3
                    </span>
                    Number of Participants
                  </h2>

                  <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">Guests</h3>
                      <p className="text-gray-400">${PRICE_PER_PERSON} USD per person</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-3xl font-bold w-12 text-center" style={{ color: RASTA.gold }}>
                        {participants}
                      </span>
                      <button
                        onClick={() => setParticipants(Math.min(20, participants + 1))}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-colors text-black"
                        style={{ backgroundColor: RASTA.gold }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Group Image */}
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src="/images/rastasafari/atv-jungle.jpg"
                      alt="Group ATV Tour"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm text-gray-300">
                        Perfect for groups, families, and solo adventurers alike!
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${RASTA.green}10`, borderColor: RASTA.green, borderWidth: 1 }}>
                    <h4 className="font-semibold mb-2" style={{ color: RASTA.green }}>Group Discount</h4>
                    <p className="text-sm text-gray-300">
                      Groups of 6+ receive a 10% discount. Contact us for special group rates!
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 4 - PERSONAL INFORMATION */}
              {/* ============================================================= */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: RASTA.gold }}
                    >
                      4
                    </span>
                    Your Information
                  </h2>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all"
                        style={{
                          borderColor: fullName ? RASTA.green : undefined,
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all"
                        style={{
                          borderColor: email ? RASTA.green : undefined,
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 876 123 4567"
                          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all"
                          style={{
                            borderColor: phone ? RASTA.green : undefined,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        We&apos;ll send you pickup details via WhatsApp
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${RASTA.green}10`, borderColor: RASTA.green, borderWidth: 1 }}>
                    <p className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: RASTA.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-gray-300">
                        Your information is secure and will only be used for booking purposes.
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 5 - SUMMARY & PAYMENT */}
              {/* ============================================================= */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: RASTA.gold }}
                    >
                      5
                    </span>
                    Summary & Payment
                  </h2>

                  {/* Booking Summary */}
                  <div className="space-y-4 mb-8">
                    <div className="p-5 bg-white/5 rounded-2xl">
                      <h3 className="font-semibold mb-4" style={{ color: RASTA.gold }}>Booking Summary</h3>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Date:</span>
                          <p className="font-medium">{formatDate(selectedDate)}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Session:</span>
                          <p className="font-medium">{AVAILABLE_SESSIONS.find(s => s.id === selectedSession)?.time}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Participants:</span>
                          <p className="font-medium">{participants} {participants > 1 ? 'people' : 'person'}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Price per person:</span>
                          <p className="font-medium">${PRICE_PER_PERSON} USD</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-white/5 rounded-2xl">
                      <h3 className="font-semibold mb-4" style={{ color: RASTA.gold }}>Contact Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Name:</span>
                          <p className="font-medium">{fullName}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <p className="font-medium">{email}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Phone:</span>
                          <p className="font-medium">{phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="p-5 rounded-2xl mb-8" style={{ backgroundColor: `${RASTA.gold}10`, borderColor: RASTA.gold, borderWidth: 2 }}>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Amount</span>
                      <span className="text-3xl font-bold" style={{ color: RASTA.gold }}>${totalPrice} USD</span>
                    </div>
                  </div>

                  {/* Payment Form (Demo Stripe-like) */}
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="6" fill="#635BFF"/>
                        <path d="M14.5 13.5c0-.83.67-1.5 1.5-1.5h8c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-8c-.83 0-1.5-.67-1.5-1.5v-5z" fill="#fff"/>
                        <path d="M6.5 11.5c0-.83.67-1.5 1.5-1.5h8c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5H8c-.83 0-1.5-.67-1.5-1.5v-5z" fill="#fff" fillOpacity=".5"/>
                      </svg>
                      <span className="font-semibold">Secure Payment</span>
                      <span className="text-xs text-gray-400">(Demo Mode)</span>
                    </div>

                    <div className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Expiry */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all font-mono"
                          />
                        </div>

                        {/* CVC */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={!canGoNext() || isProcessing}
                      className={`
                        w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                        ${canGoNext() && !isProcessing ? 'hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed'}
                      `}
                      style={{
                        backgroundColor: canGoNext() && !isProcessing ? RASTA.green : '#4B5563',
                        color: '#fff'
                      }}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Pay ${totalPrice} USD
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                      Demo mode - no actual payment will be processed
                    </p>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="mt-6 p-4 rounded-xl text-sm" style={{ backgroundColor: `${RASTA.red}10`, borderColor: RASTA.red, borderWidth: 1 }}>
                    <h4 className="font-semibold flex items-center gap-2 mb-2" style={{ color: RASTA.red }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Cancellation Policy
                    </h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>- Free cancellation up to 48 hours before</li>
                      <li>- 50% refund between 48h and 24h before</li>
                      <li>- No refund less than 24h before</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* NAVIGATION BUTTONS */}
              {/* ============================================================= */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    onClick={goBack}
                    className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 && (
                  <button
                    onClick={goNext}
                    disabled={!canGoNext()}
                    className={`
                      px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all
                      ${canGoNext() ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                    `}
                    style={{
                      background: canGoNext()
                        ? `linear-gradient(90deg, ${RASTA.red}, ${RASTA.gold}, ${RASTA.green})`
                        : '#4B5563',
                      color: canGoNext() ? '#000' : '#9CA3AF'
                    }}
                  >
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SIDEBAR - PRICE SUMMARY */}
          {/* ============================================================= */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Price Summary Card */}
              <div
                className="rounded-2xl p-6 border"
                style={{
                  background: `linear-gradient(135deg, ${RASTA.green}20, ${RASTA.gold}20)`,
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" style={{ color: RASTA.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Price Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      {participants} {participants > 1 ? 'Guests' : 'Guest'} x ${PRICE_PER_PERSON}
                    </span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>

                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold" style={{ color: RASTA.gold }}>${totalPrice} USD</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg text-xs text-gray-400">
                  <p className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RASTA.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All-inclusive pricing - no hidden fees</span>
                  </p>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" style={{ color: RASTA.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What&apos;s Included
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {[
                    'Round-trip transportation',
                    'ATV Safari Tour',
                    'Authentic Jamaican lunch',
                    'Local beverages',
                    'Experienced guide',
                    'Safety equipment',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RASTA.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tour Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image
                  src="/images/rastasafari/safari-tour.jpg"
                  alt="Safari Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium">Rastasafari Experience</p>
                  <p className="text-xs text-gray-300">The #1 Tour in Jamaica</p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: `${RASTA.gold}10`, borderColor: RASTA.gold, borderWidth: 1 }}>
                <p className="font-semibold mb-2" style={{ color: RASTA.gold }}>Need Help?</p>
                <p className="text-gray-300 mb-2">
                  Contact us on WhatsApp:
                </p>
                <a
                  href="https://wa.me/18761234567"
                  className="font-medium hover:underline flex items-center gap-2"
                  style={{ color: RASTA.gold }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  +1 876 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
