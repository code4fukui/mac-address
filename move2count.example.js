import { CSV } from "https://js.sabae.cc/CSV.js";
import { move2count } from "./move2count.js";

const data = await CSV.fetchJSON("move/1.csv");
const cnt = move2count(data);
console.log(cnt);
