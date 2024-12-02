import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const writesorted = false;

const fns = await dir2array("user");
const list = [];
const all = [];
for (const fn of fns) {
  const path = "user/" + fn;
  const data = await CSV.fetchJSON(path);
  if (writesorted) {
    data.sort((a, b) => a.時間.localeCompare(b.時間));
    await Deno.writeTextFile(path, CSV.stringify(data));
  }

  const user = fn.substring(0, fn.length - 4);
  const cnt = data.length;
  //const pos = ArrayUtil.toUnique(data.map(i => i.施設No));
  const pos = data.map(i => i.施設No);
  console.log(user, cnt, pos.length, pos);
  list.push({ user, cnt, poslen: pos.length, pos: pos.join(",") });

  data.forEach(i => {
    i.ユーザー情報 = user;
    all.push(i);
  });
}
list.sort((a, b) => (b.poslen - a.poslen) * 10000 + (b.cnt - a.cnt));
await Deno.writeTextFile("user.csv", CSV.stringify(list, null, 2));

await Deno.writeTextFile("move.csv", CSV.stringify(all, null, 2));
console.log(all.length);
