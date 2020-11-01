import React, {useState} from 'react';
import {Text} from 'react-native';

import styles from './TimerStyles';
import formatTime from '../../utils/formatTime';

const Timer = (initElapsed, initDisabled, style, disabledStyle) => {
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(initElapsed || 0);
  const [disabled, setDisabled] = useState(initDisabled || true);

  let startTime = null;
  let lastElapsed = 0;
  let interval = null;

  const start = () => {
    setDisabled(false);

    startTime = new Date();
    interval = setInterval(() => {
      if (paused) return;
      const newElapsed =
        Math.floor((new Date() - this.startTime) / 1000) + this.lastElapsed;
      if (newElapsed == elapsed) return;
      setElapsed(newElapsed);
    }, 100);
  };

  const pause = () => {
    setPaused(true);

    lastElapsed = elapsed;
    return elapsed;
  };

  const resume = () => {
    setPaused(false);

    startTime = new Date();
  };

  const stop = () => {
    interval && clearInterval(interval);
    if (paused) {
      setPaused(false);
    }
    return elapsed;
  };

  const reset = () => {
    interval && clearInterval(interval);
    startTime = null;
    lastElapsed = 0;

    setPaused(false);
    setElapsed(initElapsed || 0);
    setDisabled(initDisabled || true);
  };

  const updateElapsed = (newElapsed) => {
    startTime = null;
    lastElapsed = newElapsed;
    setElapsed(newElapsed);
  };

  // const getElapsed = () => {
  //   return elapsed;
  // };

  return (
    <Text style={[styles.text, style, disabled && disabledStyle]}>
      {formatTime(elapsed)}
    </Text>
  );
};

export default Timer;
