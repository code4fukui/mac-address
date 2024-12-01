import * as t from "https://deno.land/std/testing/asserts.ts";
import { makeDT } from "./makeDT.js";

Deno.test("simple", () => {
  t.assertEquals(makeDT(60), "00:01:00");
  t.assertEquals(makeDT(0), "00:00:00");
  t.assertEquals(makeDT(1), "00:00:01");
  t.assertEquals(makeDT(60 * 60), "01:00:00");
  t.assertEquals(makeDT(60 * 60 + 30), "01:00:30");
});
