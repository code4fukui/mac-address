import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const data = await CSV.fetchJSON("00_M5_facility list.csv");
console.log(data, data.length);

await Deno.mkdir("user");

let cnt = 0;
// No.,エリア,業種,施設名(日本語),施設名(ローマ字),緯度,経度
for (const item of data) {
  const no = item["No."];
  if (no == 42 || no == 69) continue;
  const name = item["施設名(ローマ字)"];
  const fn = no + "_" + name;
  console.log(fn);
  const dir = await dir2array(fn);
  console.log(dir);
  const list = {};
  for (const f of dir) {
    const data = await CSV.fetchJSON(fn + "/" + f);
    console.log(data.length);
    for (const item of data) {
      const user = item["ユーザー情報"];
      if (!list[user]) {
        list[user] = [];       
      }
      delete item["ユーザー情報"];
      list[user].push(item);
    }
    cnt += data.length;
  }

  for (const user in list) {
    const data = list[user];
    const path = "user/" + user + ".csv";
    const data0 = await CSV.fetchJSON(path, []);
    data0.forEach(i => data.push(i));
    await Deno.writeTextFile(path, CSV.stringify(data, null, 2));
  }
}
//console.log(Object.keys(list).length);
console.log(cnt); // 30,794,029
