import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { shrinkData } from "./shrinkData.js";

const data = await CSV.fetchJSON("00_M5_facility list.csv");
console.log(data, data.length);

const dt = 30 * 60; // 30min

await Deno.mkdir("user");

// 9270655

let cnt = 0;
// No.,エリア,業種,施設名(日本語),施設名(ローマ字),緯度,経度
//for (const item of data) {
console.log(data.length);
//Deno.exit();

// 38 ng
// 41
// 42 skip した
// 45 ng
// 51 ng

//const nglist = [38, 41, 45, 51, 52, 53];

for (let i = 0; i < data.length; i++) {
//for (let i = 0; i < 30; i++) {
//for (let i = 54; i < data.length; i++) {
  const item = data[i];
  const no = item["No."];
  if (no == 42 || no == 69) continue;
  const name = item["施設名(ローマ字)"];
  const fn = no + "_" + name;
  console.log(fn);
  const dir = await dir2array(fn);
  //console.log(dir);
  const list = {};
  for (const f of dir) {
    const data0 = await CSV.fetchJSON(fn + "/" + f);
    const data = shrinkData(data0, dt);
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
console.log(cnt); // 30,794,029 (shrink 423,993)
