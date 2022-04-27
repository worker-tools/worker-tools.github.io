---
# THIS FILE WAS COPIED FROM worker-tools/response-creators/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A collection of factory functions for Fetch API Response types with pre-filled status and status-text headers for well-known HTTP status codes.
links:
  github: https://github.com/worker-tools/response-creators
  ghuc: https://ghuc.cc/worker-tools/response-creators/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/response-creators
  unpkg: https://unpkg.com/browse/@worker-tools/response-creators/
  deno: https://deno.land/x/response_creators
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/response-creators/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/response_creators/index.ts
---

# Response Creators

A collection of factory functions for [Fetch API](https://developer.mozilla.org/docs/Web/API/Response) `Response` types with pre-filled status and status-text headers for [well-known HTTP status codes](https://developer.mozilla.org/docs/Web/HTTP/Status).

<noscript></noscript>
* Table of Contents
{:toc .large-only}

It is meant to be used in Service Workers and/or Cloudflare Workers.

```js
import { ok } from '@worker-tools/response-creators'

self.addEventListener('fetch', event => event.respondWith(ok()))
```

For the most part, factory functions can be used like regular `Response` constructors, e.g. 

```js
event.respondWith(
  ok('Your custom body init', { headers: { 'Content-Type': 'text/plain' } })
)
```

However, some provide a slightly different interface for enhanced usability. E.g. redirects (300, 301, 302, 303, 307, 308):

```js
event.respondWith(
  seeOther(`/your-redirect-url`)
)
```

(This will set the `Location` header to `/your-redirect-url`).

**NOTE**: When using JSON response bodies, consider combining it with [`worker-tools/json-fetch`](../json-fetch) like so:

```js
event.respondWith(
  new JSONResponse({ error: '...' }, badRequest())
)
```

Due to signature of the `Response` constructor, the opposite order (`badRequest(new JSONResponse({ error: '...' }))`) does not work!

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