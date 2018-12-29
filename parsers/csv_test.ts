import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import { parseCsv } from "./csv.ts";

test(function basic() {
  const input = `test,123,456`;
  const result = [["test", "123", "456"]];
  assertEqual(parseCsv(input), result);
});

test(function multiline() {
  const input = `a,b,c
d,e,f
g,h,i`;
  const result = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]];
  assertEqual(parseCsv(input), result);
});

test(function multilineEscaped() {
  const input = `a,"b
bb",c
d,"e""""",f
g,h,i`;
  const result = [["a", "b\nbb", "c"], ["d", 'e""', "f"], ["g", "h", "i"]];
  assertEqual(parseCsv(input), result);
});
