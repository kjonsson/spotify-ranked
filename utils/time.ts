export const millisecondsToMinutesAndSeconds = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = parseInt(((milliseconds % 60000) / 1000).toFixed(0));

  if (seconds === 60) {
    return minutes + 1 + ":00";
  }

  if (seconds < 10) {
    return minutes + ":" + "0" + seconds.toFixed(0);
  }

  return minutes + ":" + seconds.toFixed(0);
};
