---
# THIS FILE WAS COPIED FROM worker-tools/structured-json/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  Stringify and parse JavaScript values according to Structured Clone Algorithm.
---

# Structured JSON

Stringify and parse JavaScript values according to Structured Clone Algorithm.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

This allows sending more advanced JS types across the network, including `Date`, `Map`, `Set`, `ArrayBuffer` and various typed arrays.

See <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm> for more.

## Usage
```js
import * as Structured from '@worker-tools/structured-json'
```

The module exposes these functions:
- `Structured.stringify`
- `Structured.parse`
- `Structured.toJSON` 
- `Structured.fromJSON` 

This module supports `File`, `Blob` and `FileList`, however use of `stringifyAsync` or `toJSONAsync` is required if your data contains any of these.

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/structured-json)
| [ghuc.cc](https://ghuc.cc/worker-tools/structured-json/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/structured-json) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/structured-json/)
· [__deno.land__](https://deno.land/x/structured_json)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/structured-json/master/index.ts)
{:.faded}
<br/>