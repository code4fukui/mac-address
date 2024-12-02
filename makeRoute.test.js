import * as t from "https://deno.land/std/testing/asserts.ts";
import { makeRoute } from "./makeRoute.js";

Deno.test("simple", () => {
  t.assertEquals(makeRoute([1, 1, 2, 2, 3]), [1, 2, 3]);
  t.assertEquals(makeRoute([1]), [1]);
  t.assertEquals(makeRoute([]), []);
  t.assertEquals(makeRoute([1, 1, 1, 1]), [1]);
});
