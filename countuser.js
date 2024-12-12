import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { shrinkData } from "./shrinkData.js";

const data = await CSV.fetchJSON("00_M5_facility list.csv");
// No.,エリア,業種,施設名(日本語),施設名(ローマ字),緯度,経度
//for (const item of data) {
console.log(data.length);
//Deno.exit();

const dt = 30 * 60; // 30min if shrink
//const dt = 0;

// 38 ng
// 41
// 42 skip した
// 45 ng
// 51 ng

//const nglist = [38, 41, 45, 51, 52, 53];

const listall = {};
let cnt = 0;
const files = [];

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
  for (const f of dir) {
    const list = {};
    const data0 = await CSV.fetchJSON(fn + "/" + f);
    const data = dt == 0 ? data0 : shrinkData(data0, dt);
    for (const item of data) {
      const user = item["ユーザー情報"];
      if (!list[user]) {
        list[user] = 0;
      }
      delete item["ユーザー情報"];
      list[user]++;
    }
    const listlen = Object.keys(list).length;
    cnt += data.length;

    const file = {
      no,
      file: f,
      n_records: data0.length,
      n_records_shrink: data.length,
      n_users: listlen,
    };
    files.push(file);
    console.log(Object.values(file).join(", "));

    for (const user in list) {
      if (!listall[user]) {
        listall[user] = 0;
      }
      listall[user] += list[user];
    }
  }
  // await writeUser(list);
}
//console.log(Object.keys(list).length);
await Deno.writeTextFile("files.csv", CSV.stringify(files));
console.log(cnt); // 30,794,029 (30min shrink 423,993)
const users = Object.entries(listall);
await Deno.writeTextFile("listall.csv", CSV.stringify(users));
console.log("n_users:", Object.keys(listall).length); // 3651
