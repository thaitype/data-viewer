import {test, expect} from "vitest";
import { sum } from "./main";

test("test sum", () => {
  expect(sum(1, 2)).toBe(3);
});
