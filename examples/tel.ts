import * as $ from "../index.ts";

var numbers = $.regex(/[0-9]+/);
var minus = $.char("-");

var tel = $.seq(numbers, minus, numbers, minus, numbers);

var result = tel("03-1234-5678", 0);
console.log(result);
