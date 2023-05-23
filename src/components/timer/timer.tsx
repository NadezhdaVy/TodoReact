import { useState, useEffect, memo } from 'react';

import './timer.css';

import { useTasks } from '../../context/tasks-context';

interface ITimerProps {
  timer: number;
  id: number;
}

function Timer({ timer, id }: ITimerProps) {
  const { updateTimer: startTimer } = useTasks();

  const [seconds, setSeconds] = useState(timer);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState<{ m: number; s: number } | Record<string, never>>({});

  const convertToTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);

    const second = Math.ceil(sec % 60);

    setTime({ m: minutes, s: second });
  };

  useEffect(() => {
    if (seconds > 0) {
      convertToTime(seconds);
    }
  }, [seconds]);

  // fix

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    } else if (seconds === 0 && interval) {
      clearInterval(interval);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      startTimer(id, seconds);
      clearInterval(interval as ReturnType<typeof setInterval>);
    };
  }, [isActive, seconds, id, startTimer]);

  const playTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <div>
      {seconds === 0 ? null : (
        <span className="description">
          <button type="button" className="icon icon-play" onClick={() => playTimer()} />
          <button type="button" className="icon icon-pause" onClick={() => stopTimer()} />

          {`${time.m} : ${time.s}`}
        </span>
      )}
    </div>
  );
}

export default memo(Timer);
