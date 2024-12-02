import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { makeRoute } from "./makeRoute.js";

const writesorted = true;

const timeSort = (a, b) => a.時間.localeCompare(b.時間);
const timeSort2 = (a, b) => a.dt.localeCompare(b.dt);

const fns = await dir2array("user");
const list = [];
const all = [];
let userid = 1;
for (const fn of fns) {
  const path = "user/" + fn;
  const data = await CSV.fetchJSON(path);
  if (writesorted) {
    data.sort(timeSort);
    await Deno.writeTextFile(path, CSV.stringify(data));
  }

  const user = fn.substring(0, fn.length - 4);
  const cnt = data.length;
  //const pos = ArrayUtil.toUnique(data.map(i => i.施設No));
  //const pos = data.map(i => i.施設No);
  const pos = makeRoute(data.map(i => i.施設No));
  console.log(user, cnt, pos.length, pos);
  list.push({ userid, user, cnt, poslen: pos.length, pos: pos.join(",") });

  data.forEach(i => {
    i.userid = userid;
    // 時間,施設No,滞在時間,userid
    all.push({ dt: i.時間, spend: i.滞在時間, no: i.施設No, userid });
  });
  userid++;
}
list.sort((a, b) => (b.poslen - a.poslen) * 10000 + (b.cnt - a.cnt));
await Deno.writeTextFile("user.csv", CSV.stringify(list, null, 2));

all.sort(timeSort2);
await Deno.writeTextFile("move.csv", CSV.stringify(all, null, 2));
console.log(all.length);
