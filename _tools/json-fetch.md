---
# THIS FILE WAS COPIED FROM worker-tools/json-fetch/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A drop-in replacements for fetch, Request, and Response with first class support for JSON objects.
---

# JSON Fetch

A drop-in replacements for `fetch`, `Request`, and `Response` with first class support for JSON objects.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

Unlike other HTTP libraries, this one stays as close as possible to the original Fetch API, 
while improving the ergonomics the most common use case:

Before:

```ts
const response = await fetch('/some', { 
  method: 'POST',
  body: JSON.stringify(json), 
  headers: {
    'Content-Type': 'application/json',
  },
});
```

After:

```ts
import { JSONRequest } from '@worker-tools/json-fetch';

const response = await fetch(new JSONRequest('/some', { 
  method: 'POST', 
  body: json,
}));
```

You can also use the updated `jsonFetch` function:

```ts
import { jsonFetch as fetch } from '@worker-tools/json-fetch';

const response = await fetch('/some', { method: 'POST', body: data })
```

Note that previous use cases remain intact, i.e. posting `FormData`, `ReadableStream`, etc. as body works:

```ts
const response = await fetch(new JSONRequest('/some', { 
  method: 'POST', 
  body: new FromData(form),
}))
```

This will send the body as form-data/multipart with correct content type header, as in the original Fetch API. 
Only difference is that the `Accept` header will be set to indicate preference for `application/json`, i.e. anticipating a JSON response from the server.



***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/json-fetch)
| [ghuc.cc](https://ghuc.cc/worker-tools/json-fetch/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/json-fetch) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/json-fetch/)
· [__deno.land__](https://deno.land/x/json_fetch)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/json-fetch/master/index.ts)
{:.faded}
<br/>