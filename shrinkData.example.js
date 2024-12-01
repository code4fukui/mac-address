import { shrinkData } from "./shrinkData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

//const dt = 60; // 1min
//const dt = 3 * 60; // 3min
//const dt = 10 * 60; // 10min
const dt = 30 * 60; // 30min

const fn = "74_Nihonkai_Sakana_Machi/20241027/20241027.csv";
const data = await CSV.fetchJSON(fn);
const data2 = shrinkData(data, dt);
console.log(data2, data.length, "→", data2.length);
await Deno.writeTextFile("test.csv", CSV.stringify(data2));
