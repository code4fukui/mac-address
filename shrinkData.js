import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { makeDT } from "./makeDT.js";

// 時間,施設No,ユーザー情報 → 時間,施設No,ユーザー情報,滞在秒
export const shrinkData = (data, dtsec = 60) => {
  const fid = data[0]["施設No"];
  if (data.find(i => i["施設No"] != fid)) throw new Error("illegal 施設No");
  const users = ArrayUtil.toUnique(data.map(i => i.ユーザー情報));
  const list2 = [];
  for (const user of users) {
    const list = data.filter(i => i.ユーザー情報 == user);
    let lastt = new DateTime(list[0].時間).getTime();
    let startt = lastt;
    for (const item of list) {
      const t = new DateTime(item.時間).getTime();
      if (t - lastt > dtsec * 1000) {
        const dt = (lastt - startt) / 1000;
        list2.push({ 時間: new DateTime(startt).toString(), "施設No": fid, ユーザー情報: user, 滞在時間: makeDT(dt) });
        startt = lastt = t;
      } else {
        lastt = t;
      }
    }
    const dt = (lastt - startt) / 1000;
    list2.push({ 時間: new DateTime(startt).toString(), "施設No": fid, ユーザー情報: user, 滞在時間: makeDT(dt) });
  }
  return list2;
};
