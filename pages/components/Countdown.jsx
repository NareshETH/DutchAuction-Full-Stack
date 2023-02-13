import React, { useState, useEffect } from "react";

function Countdown({ time }) {
  const [timeLeft, setTimeLeft] = useState(time);
  const initialTime = time;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        setTimeLeft(initialTime);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, initialTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex shadow-md shadow-[#64f4ab] bg-black w-fit rounded-2xl lap:text-xl  border-r-4  border-red-400">
      <div className="border-r-2 p-2 text-center">
        <p> {minutes}</p>
        <small>Minutes</small>
      </div>
      <div className="p-2 text-center">
        <p> {seconds}</p>
        <small>Seconds</small>
      </div>
    </div>
  );
}

export default Countdown;
