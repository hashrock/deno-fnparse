import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import * as $ from "../index.ts";

test(function token() {
  var parse = $.token("hoge");
  assertEqual(parse("hoge", 0), [true, "hoge", 4]);
  assertEqual(parse("fuga", 0), [false, null, 0]);
});

test(function choice() {
  var parse = $.choice($.token("hoge"), $.token("fuga"));
  assertEqual(parse("hoge", 0), [true, "hoge", 4]);
  assertEqual(parse("fuga", 0), [true, "fuga", 4]);
  assertEqual(parse("piyo", 0), [false, null, 0]);
});

test(function many() {
  var parse = $.many($.token("ab"));
  assertEqual(parse("", 0), [true, [], 0]);
  assertEqual(parse("ab", 0), [true, ["ab"], 2]);
  assertEqual(parse("abab", 0), [true, ["ab", "ab"], 4]);
});

test(function seq() {
  var parse = $.seq($.token("ab"), $.token("cd"), $.token("ef"));
  assertEqual(parse("abcdef", 0), [true, ["ab", "cd", "ef"], 6]);
});

test(function regex() {
  var parse = $.regex(/hoge/);
  assertEqual(parse("hoge", 0), [true, "hoge", 4]);
  assertEqual(parse("ahoge", 0), [false, null, 0]);
  assertEqual(parse("ahoge", 1), [true, "hoge", 5]);
});

test(function regexNumber() {
  var parse = $.regex(/^[1-9][0-9]*|[0-9]/);
  assertEqual(parse("0", 0), [true, "0", 1]);
  assertEqual(parse("10", 0), [true, "10", 2]);
  assertEqual(parse("(10", 0), [false, null, 0]);
});

test(function option() {
  var parse = $.option($.token("hoge"));
  assertEqual(parse("hoge", 0), [true, "hoge", 4]);
  assertEqual(parse("fuga", 0), [true, null, 0]);
});

test(function lazy() {
  var parse = $.lazy(function() {
    return $.token("hoge");
  });
  assertEqual(parse("hoge", 0), [true, "hoge", 4]);
});

test(function map() {
  var parse = $.map($.token("hoge"), function(result) {
    return result + result;
  });
  assertEqual(parse("hoge", 0), [true, "hogehoge", 4]);
});

test(function char() {
  var parse = $.char("hoge");
  assertEqual(parse("h", 0), [true, "h", 1]);
  assertEqual(parse("o", 0), [true, "o", 1]);
  assertEqual(parse("g", 0), [true, "g", 1]);
  assertEqual(parse("e", 0), [true, "e", 1]);

  parse = $.char("hoge", true);

  assertEqual(parse("h", 0), [false, null, 0]);
  assertEqual(parse("o", 0), [false, null, 0]);
  assertEqual(parse("a", 0), [true, "a", 1]);
});
