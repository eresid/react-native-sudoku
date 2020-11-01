class TimerHelper {
  paused;
  elapsed;
  disabled;

  startTime = null;
  lastElapsed = 0;
  interval = null;

  constructor() {
    this.paused = false;
    this.elapsed = 0; // initElapsed || 0;
    this.disabled = true; // initDisabled || true;
  }

  start = (listener) => {
    this.disabled = false;

    this.startTime = new Date();
    this.interval = setInterval(() => {
      if (this.paused) {
        return;
      }

      const newElapsed =
        Math.floor((new Date() - this.startTime) / 1000) + this.lastElapsed;

      if (newElapsed == this.elapsed) {
        return;
      }

      this.elapsed = newElapsed;
      listener(newElapsed);
    }, 100);
  };

  pause = () => {
    this.paused = true;

    this.lastElapsed = this.elapsed;
    return this.elapsed;
  };

  resume = () => {
    this.paused = false;

    this.startTime = new Date();
  };

  stop = () => {
    this.interval && clearInterval(this.interval);
    if (this.paused) {
      this.paused = false;
    }
    return this.elapsed;
  };

  reset = () => {
    this.interval && clearInterval(this.interval);
    this.startTime = null;
    this.lastElapsed = 0;

    this.paused = false;
    this.elapsed = this.initElapsed || 0;
    this.disabled = this.initDisabled || true;
  };

  updateElapsed = (newElapsed) => {
    this.startTime = null;
    this.lastElapsed = newElapsed;
    this.elapsed = newElapsed;
  };

  getElapsed = () => {
    return this.elapsed;
  };
}

export default TimerHelper;
