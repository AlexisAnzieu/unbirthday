import { useState, useEffect, useCallback } from "react";
import "../styles/Timer.css";

function Timer() {
  const [customMinutes, setCustomMinutes] = useState("15");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getTimerDuration = () => {
    const minutes = parseInt(customMinutes) || 15;
    return Math.max(1, Math.min(60, minutes)) * 60;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setCustomMinutes(value);
    if (!isRunning) {
      setTimeLeft(parseInt(value || "15") * 60);
    }
  };

  const resetTimer = useCallback(() => {
    const duration = getTimerDuration();
    setTimeLeft(duration);
    setIsRunning(false);
    setIsFinished(false);
  }, [getTimerDuration]);

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
        <div className={`timer-input-container ${isRunning ? "hidden" : ""}`}>
          <span>Durée:</span>
          <input
            type="text"
            className="timer-input"
            value={customMinutes}
            onChange={handleDurationChange}
            disabled={isRunning}
            maxLength={2}
            aria-label="Timer duration in minutes"
          />
          <span>minutes</span>
        </div>
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
              : timeLeft === getTimerDuration()
              ? "Démarrer"
              : "Reprendre"}
          </button>
          {timeLeft !== getTimerDuration() && (
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
