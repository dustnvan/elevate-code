import { useEffect, useState } from 'react';

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  return <>{time.toLocaleTimeString('it-IT')}</>;
};
export default Time;
