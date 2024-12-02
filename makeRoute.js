export const makeRoute = (pos) => {
  const res = [];
  let bkpos = null;
  for (const p of pos) {
    if (bkpos !== p) {
      res.push(p);
      bkpos = p;
    }
  }
  return res;
};
