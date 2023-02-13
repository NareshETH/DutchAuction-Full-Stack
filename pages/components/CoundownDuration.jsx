import React, { useState, useEffect } from "react";

function CountdownDuration({ remainingTime }) {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const initialTime = remainingTime;

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

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor(((timeLeft % 86400) % 3600) / 60);
  const seconds = ((timeLeft % 86400) % 3600) % 60;

  return (
    <div className="flex shadow-md shadow-[#64f4ab] bg-black text-sm w-fit lap:text-lg  border-r-4 rounded-2xl border-red-400">
      <section className=" border-r-2   text-center lap:p-3 p-2 ">
        <p className="">{days}</p>
        <small>Days</small>
      </section>
      <section className=" border-r-2 flex flex-col lap:p-3 p-2 text-center">
        <p>{hours}</p>
        <small>Hours</small>
      </section>{" "}
      <section className=" border-r-2 lap:p-3 text-center p-2">
        <p>{minutes}</p>
        <small>Minutes</small>
      </section>{" "}
      <section className="lap:p-3 text-center p-2  ">
        <p>{seconds}</p>
        <small>Seconds</small>
      </section>
    </div>
  );
}

export default CountdownDuration;
