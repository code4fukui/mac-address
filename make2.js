import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const fns = await dir2array("user");
const list = [];
for (const fn of fns) {
  const data = await CSV.fetchJSON("user/" + fn);
  const user = fn.substring(0, fn.length - 4);
  const cnt = data.length;
  const pos = ArrayUtil.toUnique(data.map(i => i.施設No));
  console.log(user, cnt, pos.length, pos);
  list.push({ user, cnt, poslen: pos.length, pos: pos.join(",") });
}
list.sort((a, b) => (b.poslen - a.poslen) * 10000 + (b.cnt - a.cnt));
await Deno.writeTextFile("user.csv", CSV.stringify(list, null, 2));
