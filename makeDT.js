const fix2 = (n) => n < 10 ? "0" + n : "" + n;

export const makeDT = (sec) => {
  let s = sec;
  const h = Math.floor(s / (60 * 60));
  s -= h * (60 * 60);
  const m = Math.floor(s / 60);
  s -= m * 60;
  return fix2(h) + ":" + fix2(m) + ":" + fix2(s);
};
