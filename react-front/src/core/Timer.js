import React from "react";
//import "./Timerstyles.css";

const Timer = React.memo(({ callBack, isTimerRunning }) => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  const showMenuMemo = React.useMemo(() => {
    return isTimerRunning;
  }, [isTimerRunning]);

  React.useEffect(() => {
    if (showMenuMemo) {
      setTimerOn(true);
    } else {
      //reset time
      setTime(0);
      setTimerOn(false);
    }
  }, [showMenuMemo]);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= 60000) {
            callBack();
            setTimerOn(false);
            clearInterval(interval);
          }
          return prevTime + 10;
        });
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className="Timers text-center">
      {/* <h2>Stopwatch</h2> */}
      <div id="display">
        <span
          style={{
            width: "30px",
            fontSize: "1.5rem",
            fontWeight: "800px",
            color: "red",
          }}
        >
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span
          style={{
            width: "30px",
            fontSize: "1.5rem",
            fontWeight: "800px",
            color: "red",
          }}
        >
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span
          style={{
            width: "30px",
            fontSize: "1.5rem",
            fontWeight: "800px",
            color: "red",
          }}
        >
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>

      <div id="buttons">
        {/* {!timerOn && time === 0 && (
          <button onClick={() => {
            setTimerOn(true)
          }}>Start</button>
        )} */}
        {/* {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )} */}
      </div>
    </div>
  );
});

export default Timer;
