import { useState } from 'react';

function App() {
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState('');
  const [isSessionTime, setIsSessionTime] = useState(true);

  const audio = new Audio("./alarm.mp3");

  const handleClickDecrementBreak = () => {
    if (breakValue > 1) {
      setBreakValue(breakValue - 1);
      setSeconds(0);
    }
  };

  const handleClickIncrementBreak = () => {
    if (breakValue < 60) {
      setBreakValue(breakValue + 1);
      setSeconds(0);
    }
  };

  const handleClickDecrementSession = () => {
    if (sessionValue > 1) {
      setSessionValue(sessionValue - 1);
      setMinutes(sessionValue - 1);
      setSeconds(0);
    }
  };

  const handleClickIncrementSession = () => {
    if (sessionValue < 60) {
      setSessionValue(sessionValue + 1);
      setMinutes(sessionValue + 1); 
      setSeconds(0);
    }
  };

  const handleChoice = () => {
    if (isSessionTime) {
      handleClickPlay();
    } else {
      handleBreak();
    }
  };

  const handleClickPlay = () => {
    if (!isPlaying) {
      const startingMinutes = minutes;
      let time = startingMinutes * 60 + seconds; //en caso de iniciar dsp de pausa, le resto los segundos que han pasado
      let interval = setInterval(() => {
        setSeconds(time % 60);
        setMinutes(Math.floor(time / 60));
        time--;

        if (time < 0) {
          audio.play();
          clearInterval(interval);
          setIsSessionTime(false);
          setMinutes(breakValue);
          setSeconds(0);
          handleBreak();
        }
      }, 1000);

      setIntervalId(interval);
      setIsPlaying(true);
    } else {
      clearInterval(intervalId);
      setIsPlaying(false);
    }
    
  };

  const handleBreak = () => {
    if (!isPlaying) {
      const startingMinutes = minutes;
      let time = startingMinutes * 60 + seconds;
      let interval = setInterval(() => {
        setSeconds(time % 60);
        setMinutes(Math.floor(time / 60));
        time--;

        if (time < 0) {
          audio.play();
          clearInterval(interval);
          setIsSessionTime(true);
          setMinutes(sessionValue);
          setSeconds(0);
          handleClickPlay();
        }
      }, 1000);

      setIntervalId(interval);
      setIsPlaying(true);
    } else {
      clearInterval(intervalId)
      setIsPlaying(false);
    }
  };

  const handleClickReset = () => {
    audio.pause();
    audio.currentTime = 0;
    setBreakValue(5);
    setSessionValue(25);
    setMinutes(25);
    setSeconds(0);
    setIsPlaying(false);
    setIsSessionTime(true);
    clearInterval(intervalId);
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">Pomodoro Timer</h1>
      </header>
      <main>
        <div className="buttons">
          <div className="break-container">
            <p id="break-label">Break Length</p>
            <div>
              <button
                id="break-decrement"
                onClick={handleClickDecrementBreak}
                disabled={isPlaying ? true : false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </button>
              <span id="break-length">{breakValue}</span>
              <button
                id="break-increment"
                onClick={handleClickIncrementBreak}
                disabled={isPlaying ? true : false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="session-container">
            <p id="session-label">Session Length</p>
            <div>
              <button
                id="session-decrement"
                onClick={handleClickDecrementSession}
                disabled={isPlaying ? true : false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </button>
              <span id="session-length">{sessionValue}</span>
              <button
                id="session-increment"
                onClick={handleClickIncrementSession}
                disabled={isPlaying ? true : false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="time-container">
          <span id="timer-label">{isSessionTime ? 'Session' : 'Break'}</span>
          <span id="time-left" style={{ color: minutes < 1 ? 'red' : 'black' }}>{`${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}</span>
        </div>
        <div className="controls">
          <button id="start_stop" onClick={handleChoice}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
            </svg>
          </button>
          <button id="reset" onClick={handleClickReset}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
            </svg>
          </button>
        </div>
      </main>
      <div className="attribution">
        <p>
          Designed and Coded by <a href="https://github.com/esepgit">Esepbit</a>
        </p>
      </div>
    </div>
  );
}

export default App
