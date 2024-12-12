import { DateTime } from "https://js.sabae.cc/DateTime.js";

//const dtstep = 10 * 60 * 1000; // 10min
//const dtstep = 30 * 60 * 1000; // 30min
const dtstepdefault = 1 * 60 * 60 * 1000; // 1hour

const parseSpend = (s) => {
  const ss = s.split(":");
  const hour = parseInt(ss[0]);
  const min = parseInt(ss[1]);
  const sec = parseInt(ss[2]);
  const dt = (sec + min * 60 + hour * 60 * 60) * 1000;
  return dt;
};

//dt,spend(00:00:10),userid
export const move2count = (move, dtstep = dtstepdefault) => {
  const data = [...move];
  data.forEach(i => {
    i.dt = new DateTime(i.dt).getTime();
    i.spend = parseSpend(i.spend);
  });
  const getCount = (start, end) => {
    let cnt = 0;
    for (const i of data) {
      //if (i.dt >= start && i.dt < end) cnt++;
      if (!(i.dt >= end || i.dt + i.spend < start)) cnt++;
    }
    return cnt;
  };

  const start0 = new DateTime(data[0].dt);
  const end0 = new DateTime(data[data.length - 1].dt);
  const start = (new DateTime(start0.day)).getTime();
  const end = (new DateTime(end0.day)).getTime();
  let sum = 0;
  const list = [];
  for (let i = start; i < end; i += dtstep) {
    const cnt = getCount(i, i + dtstep);
    //console.log(new DateTime(i).toString(), cnt);
    sum += cnt;
    list.push({ dt: new DateTime(i).toString(), cnt });
  }
  //console.log(sum);
  return list;
};
