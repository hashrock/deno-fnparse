import * as $ from "../index.ts";

const comma = $.token(",");
const dquote = $.token('"');
const escapedDquote = $.token('""');
const textdata = $.regex(/[^,\r\n"]+/);
const eol = $.choice($.token("\r\n"), $.token("\n"));
const nonEscaped = textdata;
const escaped = $.map(
  $.seq(
    dquote,
    $.many(
      $.choice(
        textdata,
        eol,
        comma,
        $.map(escapedDquote, () => {
          return '"';
        })
      )
    ),
    dquote
  ),
  result => {
    return result[1].join("");
  }
);

const field = $.choice(nonEscaped, escaped);
const record = $.sepBy(field, comma);
const file = $.sepBy(record, eol);

export function parseCsv(src: string) {
  const result = file(src, 0);
  //Parse Error
  if (!result[0]) {
    return [];
  }
  return result[1];
}
