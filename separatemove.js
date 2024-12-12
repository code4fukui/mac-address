import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await CSV.fetchJSON("move.csv");
const list = {};
// dt,spend,no,userid
for (const item of data) {
  const no = item.no;
  delete item.no;
  if (!list[no]) {
    list[no] = [];
  }
  list[no].push(item);
}
await Deno.mkdir("move");
for (const no in list) {
  await Deno.writeTextFile("move/" + no + ".csv", CSV.stringify(list[no]));
}
