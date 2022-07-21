import React, { useState, useEffect } from "react";

export default function Timer({ isStart }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (isStart) {
      setTimer(0);
    } else {
      const updateTime = setInterval(() => {
        setTimer((prTimer) => prTimer + 1);
      }, 1000);
      return () => clearInterval(updateTime);
    }
  }, [isStart]);

  return (
    <div className="time">
      🕐 {`${Math.floor(timer / 60 ** 2)}`.padStart(2, "0")}:{`${Math.floor(timer / 60)}`.padStart(2, "0")}:{`${timer % 60}`.padStart(2, "0")}
    </div>
  );
}
