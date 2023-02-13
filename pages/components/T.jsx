import React, { useEffect, useState } from "react";

function T() {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [img, setImg] = useState("");
  const [time, setTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(time);
  const initialTime = time;

  useEffect(() => {
    StartAt();
    EndAt();
    Img();
    const timee = localStorage.getItem("Time");
    setTime(timee);
  }, []);

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

  function StartAt() {
    const storee = localStorage.getItem("startAt");
    setStartAt(storee);
  }
  function EndAt() {
    const storee = localStorage.getItem("endAt");
    setEndAt(storee);
  }

  function Img() {
    const storee = localStorage.getItem("image");
    setImg(storee);
  }

  function Clear() {
    localStorage.clear();
  }
  return (
    <div>
      <h1>{days}</h1>
      <h1>{hours}</h1>
      <h1>{minutes}</h1>
      <h1>{seconds}</h1>

      <button onClick={() => Clear()}>Clear</button>
    </div>
  );
}

export default T;
