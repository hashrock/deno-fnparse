# deno-fnparse

A port of [fnparse.js](https://github.com/anatoo/fnparse.js) to TypeScript for Deno.

An extremely simple parser combinator for JavaScript.

# CSV Parser

- Based on RFC4180.
- Multiline and escape support.

```typescript
import { parseCsv } from "https://denopkg.com/hashrock/deno-fnparse/parsers/csv.ts";

parseCsv("test,123,456");
// -> [["test", "123", "456"]]
```

# Original License

The MIT License (MIT)

Copyright © 2014, Mitsunori KUBOTA <anatoo.jp@gmail.com>

Ported by hashrock
