import * as $ from "../index.ts";

const comma = $.token(",");
const textdata = $.regex(/[^,\r\n]+/);
const field = textdata;
const record = $.map($.seq(field, $.many($.seq(comma, field))), parsed => {
  // ["1", [",", "2"]] => ["1", "2"]
  return [parsed[0]].concat(
    parsed[1].reduce(function(result, item) {
      return result.concat(item[1]);
    }, [])
  );
});
const eol = $.choice($.token("\r\n"),$.token("\n"))
const file = record()

const input = `test,123,345`;

const result = record(input, 0);
console.log(result);

// S = RECORD (EOL RECORD)* (EOL PARTIAL_RECORD)? EOL?
// RECORD = FIELD (COMMA FIELD)+
// PARTIAL_RECORD = (FIELD COMMA)* PARTIAL_FIELD
// FIELD = ESCAPED | NON_ESCAPED
// PARTIAL_FIELD = PARTIAL_ESCAPED | NON_ESCAPED
// PARTIAL_ESCAPED = DQUOTE (TEXTDATA | EOL | COMMA | ESCAPED_DQUOTE )*
// ESCAPED = DQUOTE (TEXTDATA | EOL | COMMA | ESCAPED_DQUOTE )* DQUOTE
// NON_ESCAPED = TEXTDATA*
// COMMA = #","
// DQUOTE = #'"'
// ESCAPED_DQUOTE = #'""'
// TEXTDATA = #'[^,\r\n"]+'
// EOL = #"(?:\r\n|\r|\n)"
