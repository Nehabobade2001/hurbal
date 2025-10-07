import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days:  0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days    = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const padWithZero = num => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-4">
      {['days', 'hours', 'minutes', 'seconds'].map(unit => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {padWithZero(timeLeft[unit])}
          </div>
          <span className="text-sm mt-1">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
