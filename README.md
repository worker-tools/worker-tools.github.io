---
layout: landing
logo: |
  <picture>
    <img src="assets/img/logo.svg" alt="Logo" width="172" height="172">
  </picture>
description: >
  Tools for writing HTTP servers in [Worker Environments](https://workers.js.org/){:.external} such as Cloudflare Workers.
buttons: >
  [Get Started](#tools){:.btn.btn-primary}
  [Contribute](#contributing){:.btn.btn-default style="font-weight:normal"}
---

# Worker Tools

* Table of Contents
{:toc .large-only}

Worker Tools are a collection of TypeScript libraries for writing web servers in [Worker Environments][1]{:.external} such as Cloudflare Workers.

<!-- [GitHub][3], [npm][2]. -->

[1]: https://workers.js.org/
[2]: https://www.npmjs.com/org/werker
[3]: https://github.com/worker-tools  

## Tools
Many of the tools accomplish the same goals as a web framework, but they are provided as standalone libraries.

All modules are written in TypeScript and provide full type declarations and source maps for the best developer experience (tested in VSCode).

Most have no dependencies beyond what is provided by a [Worker Environment][1]. 
For those that have dependencies, only such that provide ES moduls are used. 
This makes makes it possible to use the tools without a bundler in the browser or even Deno, using either [UNPKG with `?module`](https://unpkg.com/#query-params) or [Skypack](https://skypack.dev).

### [HTML Templating](https://github.com/worker-tools/html)
HTML templating and streaming response library.

```ts
import { html, HTMLResponse } from '@worker-tools/html';
self.addEventListener('fetch', event => event.respondWith(
  new HTMLResponse(html`<html><body>
    <h1>Hello World!</h1>
    <ul>${['Foo', 'Bar', 'Baz'].map(x => html`<li>${x}</li>`)}</ul>
  </body></html>`);
));
```

### [JSON Fetch](https://github.com/worker-tools/json-fetch)
A drop-in replacements for `fetch`, `Request`, and `Response` with first class support for JSON objects.

```ts
import { JSONRequest } from '@worker-tools/json-fetch';
const body = { json: 'data' };
const response = await fetch(new JSONRequest('/api', { method: 'POST', body }));
```

### [Response Creators](https://github.com/worker-tools/response-creators)
A collection of factory functions for Fetch API `Response`s with pre-filled status and status-text headers

```ts
import { ok } from '@worker-tools/response-creators'
self.addEventListener('fetch', event => event.respondWith(ok()))
```


### [Request Cookie Store](https://github.com/worker-tools/request-cookie-store)
An implementation of the Cookie Store API for use within request handlers.

```ts
import { RequestCookieStore } from '@worker-tools/request-cookie-store';
const example = new Request('/', { headers: { 'cookie': 'foo=bar; fizz=buzz' } });
const cookieStore = new RequestCookieStore(example);
```

### KV Storage
TBD

### Router
TBD

### Sessions
TBD

### Content Negotiation
TBD

### CORS
TBD

### Authorization
TBD

## Contributing
TBD
