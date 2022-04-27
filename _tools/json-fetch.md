---
# THIS FILE WAS COPIED FROM worker-tools/json-fetch/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A drop-in replacements for fetch, Request, and Response with first class support for JSON objects.
links:
  github: https://github.com/worker-tools/json-fetch
  ghuc: https://ghuc.cc/worker-tools/json-fetch/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/json-fetch
  unpkg: https://unpkg.com/browse/@worker-tools/json-fetch/
  deno: https://deno.land/x/json_fetch
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/json-fetch/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/json_fetch/index.ts
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
[__GitHub__]({{ page.links.github }})
/ [ghuc.cc]({{ page.links.ghuc }})
· [__NPM__]({{ page.links.npm }}) 
/ [Browse Package]({{ page.links.unpkg }})
· [__deno.land__]({{ page.links.deno }})
/ [Docs]({{ page.links.docs }})
{:.faded}
<br/>