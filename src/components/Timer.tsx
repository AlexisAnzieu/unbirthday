import { useState, useEffect, useCallback } from "react";
import "../styles/Timer.css";

function Timer() {
  const TIMER_DURATION = 15 * 60; // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(TIMER_DURATION);
    setIsRunning(false);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      resetTimer();
    } else {
      setIsRunning(!isRunning);
    }
  };

  return (
    <div className="container">
      <div className="card timer-card">
        <div className="border-decoration" />
        <h1 className="timer-title">Le Temps Presse!</h1>
        <div className="pocket-watch">
          <div className="time-display timer-display">
            {formatTime(timeLeft)}
          </div>
          {isFinished && (
            <p className="quote">"Oh dear! Oh dear! I shall be late!"</p>
          )}
        </div>
        <div className="timer-controls">
          <button
            className="whimsical-button timer-button"
            onClick={toggleTimer}
          >
            {isRunning
              ? "Pause"
              : timeLeft === TIMER_DURATION
              ? "Démarrer"
              : "Reprendre"}
          </button>
          {timeLeft !== TIMER_DURATION && (
            <button
              className="whimsical-button timer-button reset-button"
              onClick={resetTimer}
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;
