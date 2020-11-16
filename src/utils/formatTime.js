const formatTime = (elapsed) => {
  const hour = Math.floor(elapsed / 60 / 60);
  const minute = Math.floor(elapsed / 60 - hour * 60);
  const second = elapsed % 60;
  return [hour, minute, second].map((x) => (x < 10 ? '0' + x : x)).join(':');
};

export default formatTime;
