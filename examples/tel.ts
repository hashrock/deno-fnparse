import * as $ from "../mod.ts";

var numbers = $.regex(/[0-9]+/);
var minus = $.char("-");

var tel = $.sepBy(numbers, minus);

var result = tel("03-1234-5678", 0);
console.log(result);
