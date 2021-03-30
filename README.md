---
layout: landing
logo: |
  <picture>
    <img src="assets/img/logo.svg" alt="Logo" width="172" height="172">
  </picture>
description: >
  Tools for writing HTTP servers in [**Worker Environments**](https://workers.js.org/){:.external} such as [**Cloudflare Workers**](https://workers.cloudflare.com).
buttons: >
  [Get Started](#tools){:.btn.btn-primary}
  [Contribute](#contributing){:.btn.btn-default style="font-weight:normal"}
---

# Worker Tools

* Table of Contents
{:toc .large-only}

Worker Tools are a collection of TypeScript libraries for writing web servers in [Worker Environments][1]{:.external} such as [Cloudflare Workers][4].

[1]: https://workers.js.org/
[2]: https://www.npmjs.com/org/worker-tools
[3]: https://github.com/worker-tools
[4]: https://workers.cloudflare.com

## Tools
Workers Tools accomplish many of the same goals as a web framework, but they are provided as standalone libraries.

All modules are written in TypeScript and provide full type declarations and source maps for the best developer experience (tested in VSCode).

Most have no dependencies beyond what is provided by a [Worker Environment][1]. 
For those that have dependencies, only such that provide ES module exports are used. 
This makes it possible to use them without a bundler (browser, Deno) using either UNPKG's [`?module`](https://unpkg.com/#query-params)  parameter or [Skypack](https://skypack.dev). E.g.:

```ts
import { html } from 'https://unpkg.com/@worker-tools/html?module';
/* --- or --- */
import { html } from 'https://cdn.skypack.dev/@worker-tools/html?dts';
```

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

### [Signed Cookie Store](https://github.com/worker-tools/signed-cookie-store)
An implementation of the Cookie Store API that transparently signs cookies via Web Cryptography API.

```ts
import { SignedCookieStore } from '@worker-tools/signed-cookie-store';
const key = await SignedCookieStore.deriveKey({ secret: 'Password123' });
const sigCookieStore = new SignedCookieStore(cookieStore, key);
await sigCookieStore.set('foo', 'bar');
```

It accepts any Cookie Store implementation, but it's mostly meant to be used with [Request Cookie Store](#request-cookie-store).


### [Encrypted Cookie Store](https://github.com/worker-tools/encrypted-cookie-store)
An implementation of the Cookie Store API that transparently encrypted cookie values via Web Cryptography API.

```ts
import { EncryptedCookieStore } from '@worker-tools/encrypted-cookie-store';
const key = await EncryptedCookieStore.deriveKey({ secret: 'Password123' });
const encCookieStore = new EncryptedCookieStore(cookieStore, key);
await encCookieStore.set('foo', 'bar');
```

It accepts any Cookie Store implementation, but it's mostly meant to be used with [Request Cookie Store](#request-cookie-store).


### [Routing](https://github.com/worker-tools/router)
Worker Tools currently only provides a placeholder for a future routing solution.

In the meantime, here are some alternatives:

- [Tiny Request Router](https://github.com/berstend/tiny-request-router).
  Highly recommended. It might be a little too tiny for many usecases, but it is a good starting point.
  Fully typed!
  
- [Workbox Routing](https://developers.google.com/web/tools/workbox/modules/workbox-routing).
  A routing solution for Service Workers made by Google. I haven't tried to personally, but it shoud work in Cloudflare Workers as well.


### [Middleware](https://github.com/worker-tools/middleware)
Worker Tools currently only provides a [placeholder](https://github.com/worker-tools/middleware) for a future middleware solution.


### KV Storage
TBD

## Contributing
You can find Worker Tools on [GitHub][3] and [npm][2].

