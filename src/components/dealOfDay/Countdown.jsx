// src/components/dealOfDay/Countdown.jsx

import { useState, useEffect } from "react";

const Countdown = ({ endDate }) => {
  const getTimeLeft = () => {
    const targetDate = new Date(endDate).getTime();
    const now = new Date().getTime();

    const difference = targetDate - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <div className="flex justify-center mt-10">
        <div className="bg-red-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg">
          ⏰ Offer Expired
        </div>
      </div>
    );
  }

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/20 shadow-xl flex items-center justify-center">
        <span className="text-3xl md:text-4xl font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm uppercase tracking-[3px] text-white/80">
        {label}
      </p>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;