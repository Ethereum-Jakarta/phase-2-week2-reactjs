import React, { useState, useEffect } from "react";

const Timer = ({ initialTime = 20, onComplete }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let interval;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [time]);

  const progress = ((initialTime - time) / initialTime) * 100;

  return (
    <div
      className="bg-lime-600 h-2.5 w-2 transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export default Timer;
