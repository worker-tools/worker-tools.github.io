---
layout: landing
logo: |
  <picture>
    <img src="assets/img/logo.svg" alt="Logo" width="172" height="172">
  </picture>
description: >
  Tools for writing HTTP servers in [**Worker Environments**](https://workers.js.org/){:.external} such as [**Cloudflare Workers**](https://workers.cloudflare.com).
# buttons: >
#   [Get Started](#tools){:.btn.btn-primary}
#   [Contribute](#contributing){:.btn.btn-default style="font-weight:normal"}
---

# Worker Tools

* Table of Contents
{:toc .large-only}

Worker Tools are a collection of TypeScript libraries for writing web servers in [Worker Environments][1]{:.external} such as [Cloudflare Workers][4].

[1]: https://workers.js.org/
[2]: https://www.npmjs.com/org/worker-tools
[3]: https://github.com/worker-tools
[4]: https://workers.cloudflare.com


Workers Tools accomplish many of the same goals as a web framework, but they are provided as standalone libraries.

All modules are written in TypeScript and provide full type declarations and source maps for the best developer experience (tested in VSCode).

Most have no dependencies beyond what is provided by a [Worker Environment][1]. 
For those that have dependencies, only such that provide ES module exports are used. 
This makes it possible to use them without a bundler using either UNPKG's [`?module`](https://unpkg.com/#query-params)  parameter or [Skypack](https://skypack.dev). E.g.:

```ts
import { html } from 'https://unpkg.com/@worker-tools/html?module';
/* --- or --- */
import { html } from 'https://cdn.skypack.dev/@worker-tools/html?dts';
```


## HTML Templating
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

[**View on GitHub**](https://github.com/worker-tools/html)


## JSON Fetch
A drop-in replacements for `fetch`, `Request`, and `Response` with first class support for JSON objects.

```ts
import { JSONRequest } from '@worker-tools/json-fetch';
const body = { json: 'data' };
const response = await fetch(new JSONRequest('/api', { method: 'POST', body }));
```

[**View on GitHub**](https://github.com/worker-tools/json-fetch)


## Response Creators
A collection of factory functions for Fetch API `Response`s with pre-filled status and status-text headers

```ts
import { ok } from '@worker-tools/response-creators'
self.addEventListener('fetch', event => event.respondWith(ok()))
```

[**View on GitHub**](https://github.com/worker-tools/response-creators)


## Request Cookie Store
An implementation of the Cookie Store API for use within request handlers.

```ts
import { RequestCookieStore } from '@worker-tools/request-cookie-store';
const example = new Request('/', { headers: { 'cookie': 'foo=bar; fizz=buzz' } });
const cookieStore = new RequestCookieStore(example);
```

[**View on GitHub**](https://github.com/worker-tools/request-cookie-store)


## Signed Cookie Store
An implementation of the Cookie Store API that transparently signs cookies via Web Cryptography API.

```ts
import { SignedCookieStore } from '@worker-tools/signed-cookie-store';
const key = await SignedCookieStore.deriveKey({ secret: 'Password123' });
const sigCookieStore = new SignedCookieStore(cookieStore, key);
await sigCookieStore.set('foo', 'bar');
```

It accepts any Cookie Store implementation, but it's mostly meant to be used with [Request Cookie Store](#request-cookie-store).

[**View on GitHub**](https://github.com/worker-tools/signed-cookie-store)


## Encrypted Cookie Store
An implementation of the Cookie Store API that transparently encrypted cookie values via Web Cryptography API.

```ts
import { EncryptedCookieStore } from '@worker-tools/encrypted-cookie-store';
const key = await EncryptedCookieStore.deriveKey({ secret: 'Password123' });
const encCookieStore = new EncryptedCookieStore(cookieStore, key);
await encCookieStore.set('foo', 'bar');
```

It accepts any Cookie Store implementation, but it's mostly meant to be used with [Request Cookie Store](#request-cookie-store).

[**View on GitHub**](https://github.com/worker-tools/encrypted-cookie-store)


## KV Storage
Worker Tools provides a suite of packages to bring the (discontinued) KV Storage API to Cloudflare Workers and Deno.
While work on [the specification](https://wicg.github.io/kv-storage/) itself has stopped, 
it's still a good interface for asynchronous data access that feels native to JavaScript.

```js
import { StorageArea } from '@worker-tools/cloudflare-kv-storage';
const storage = new StorageArea('foobar');
await storage.set(['foo', 1], ['bar', 2]);
await storage.get(['foo', 1]); // => ['bar', 2]
```

There are currently 2 packages with compatible APIs and different backing stores:
* [Cloudflare Workers](https://github.com/worker-tools/cloudflare-kv-storage)
* [Deno](https://github.com/worker-tools/deno-kv-storage)

The Cloudflare implementation uses Cloudflare's Workers KV as a [backing store](https://developers.cloudflare.com/workers/runtime-apis/kv), 
while the Deno implementation comes with built-in SQLite and Postgres adapters and the option to provide custom adapters.


## Deno Fetch Event Adapter
A short utility to support Cloudflare Worker's `fetch` event in Deno.

```js
self.addEventListener('fetch', event => {
  const ip = event.request.headers.get("x-forwarded-for");
  event.respondWith(new Response(`Hello ${ip}`, { 
    headers: [['content-type', 'text/plain']],
  }));
});
```

[**View on GitHub**](https://github.com/worker-tools/deno-fetch-event-adapter)


## Parsed HTML Rewriter
A DOM-based implementation of [Cloudflare Worker's `HTMLRewriter`](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter).

Unlike the original, this implementation parses the entire DOM (provided by [`linkedom`](https://github.com/WebReflection/linkedom)),
and runs selectors against this representation. This choice was made to quickly implement the functionality using existing tools.

```js
import '@worker-tools/parsed-html-rewriter/polyfill'
await new HTMLRewriter()
  .transform(new Response('<body></body>'))
  .text();
```

Note that unlike other Worker Tools, using this module in Deno without a bundler like `esbuild` may [proof difficult](https://github.com/worker-tools/parsed-html-rewriter/issues/2#issuecomment-912896007) due to the extensive tree of dependencies.

[**View on GitHub**](https://github.com/worker-tools/parsed-html-rewriter)


## Routing
Worker Tools currently only provides a placeholder for a future routing solution.

In the meantime, here are some alternatives:

- [Tiny Request Router](https://github.com/berstend/tiny-request-router).
  Highly recommended. It might be a little too tiny for many usecases, but it is a good starting point.
  Fully typed!
  
- [Workbox Routing](https://developers.google.com/web/tools/workbox/modules/workbox-routing).
  A routing solution for Service Workers made by Google. I haven't tried to personally, but it shoud work in Cloudflare Workers as well.


## Middleware
Worker Tools currently only provides a [placeholder](https://github.com/worker-tools/middleware) for a future middleware solution.

[**View on GitHub**](https://github.com/worker-tools/middleware)



