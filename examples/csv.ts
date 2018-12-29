import * as $ from "../index.ts";

const comma = $.token(",");
const dquote = $.token('"');
const escapedDquote = $.token('""');
const textdata = $.regex(/[^,\r\n"]+/);
const eol = $.choice($.token("\r\n"), $.token("\n"));
const nonEscaped = textdata;
const escaped = $.seq(
  dquote,
  $.many($.choice(textdata, eol, comma, escapedDquote)),
  dquote
);

const field = $.choice(nonEscaped, escaped);
const record = $.sepBy(field, comma);
const file = $.sepBy(record, eol);

const input = `test,"3
23",345
12,23,34`;

const result = file(input, 0);
// console.log(result);
console.dir(JSON.stringify(result[1], null, 2));
// S = RECORD (EOL RECORD)* (EOL PARTIAL_RECORD)? EOL?
// RECORD = FIELD (COMMA FIELD)+
// FIELD = ESCAPED | NON_ESCAPED
// ESCAPED = DQUOTE (TEXTDATA | EOL | COMMA | ESCAPED_DQUOTE )* DQUOTE
// NON_ESCAPED = TEXTDATA*
// COMMA = #","
// DQUOTE = #'"'
// ESCAPED_DQUOTE = #'""'
// TEXTDATA = #'[^,\r\n"]+'
// EOL = #"(?:\r\n|\r|\n)"
