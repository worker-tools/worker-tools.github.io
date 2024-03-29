---
layout: landing
logo: |
  <img src="assets/img/logo.svg" alt="Logo" width="172" height="172">
description: >
  Tools for writing HTTP servers in [__Worker Runtimes__](https://workers.js.org/){:.external} such as [__Cloudflare Workers__](https://workers.cloudflare.com).
buttons: >
  [Get Started](#how-to-use){:.btn.btn-primary}
  [Examples](/examples){:.btn.btn-default style="font-weight:normal"}
selected_projects:
  - _projects/worker-news.md
  - _projects/ghuc.md
  - _projects/webauthn.md
---

# Worker Tools

Worker Tools are a collection of TypeScript libraries for writing web servers in [Worker Runtimes][wkrs] such as [Cloudflare Workers][cfws] and [Deno Deploy][dndp]. 

[wkrs]: https://workers.js.org
[cfws]: https://workers.cloudflare.com
[dndp]: https://deno.com/deploy

* Table of Contents
{:toc .large-only}

## Tools
- 🧭 [__Worker Router__][router]{:.flip-title} --- Complete routing solution that works across CF Workers, Deno and Service Workers
- 🔋 [__Worker Middleware__][middleware]{:.flip-title} --- A suite of standalone HTTP server-side middleware with TypeScript support
- 📄 [__Worker HTML__][html]{:.flip-title} --- HTML templating and streaming response library
- 📦 [__Storage Area__][kv-storage]{:.flip-title} --- Key-value store abstraction across [Cloudflare KV][cloudflare-kv-storage], [Deno][deno-kv-storage] and browsers.
- 🆗 [__Response Creators__][response-creators]{:.flip-title} --- Factory functions for responses with pre-filled status and status text
- 🎏 [__Stream Response__][stream-response]{:.flip-title} --- Use async generators to build streaming responses for SSE, etc...
- 🥏 [__JSON Fetch__][json-fetch]{:.flip-title} --- Drop-in replacements for Fetch API classes with first class support for JSON.
- 🦑 [__JSON Stream__][json-stream]{:.flip-title} --- Streaming JSON parser/stingifier with 1st class support for WHATWG/web streams.
- 🧱 [__Structured JSON__][structured-json]{:.flip-title} --- Stringify and parse JavaScript values according to Structured Clone Algorithm
- 🍪 [__Request Cookie Store__][request-cookie-store]{:.flip-title} --- An implementation of the Cookie Store API for use in request handlers.
- ⏱ [__Extendable Promise__][extendable-promise]{:.flip-title} --- A promise that can be delayed/extended by calling `waitUntil`.
<!-- - 🍪 [__Signed Cookie Store__][signed-cookie-store]{:.flip-title} --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - 🍪 [__Encrypted Cookie Store__][encrypted-cookie-store]{:.flip-title} --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - ⏱ [__Resolvable Promise__][resolvable-promise]{:.flip-title} --- A promise that is resolvable or rejectable after it was created. -->

Worker Tools also includes a number of polyfills that help bridge the gap between different Worker Runtimes:
- ✏️ [__HTML Rewriter__][html-rewriter]{:.flip-title} --- Cloudflare's HTML Rewriter for use in Deno, browsers, etc...
- 📍 [__Location Polyfill__][location-polyfill]{:.flip-title} --- A `Location` polyfill for Cloudflare Workers.
- 🦕 [__Deno Fetch Event Adapter__][deno-fetch-event-adapter]{:.flip-title} --- Dispatches global `fetch` events using Deno’s native HTTP server.

### Services
Worker Tools also maintains a number of (web-) services:
- ⚙️ [__workers.js.org__][wkrs] --- Educational site about the state of Worker Runtimes.
- 🦕 [__ghuc.cc__][ghuc] --- Import modules directly from GitHub into Deno with a familiar API. 

[router]: _tools/router.md
[middleware]: _tools/middleware.md
[html]: _tools/html.md
[kv-storage]: _tools/kv-storage.md
[cloudflare-kv-storage]: _tools/cloudflare-kv-storage.md
[deno-kv-storage]: _tools/deno-kv-storage.md
[kv-storage-polyfill]: _tools/kv-storage-polyfill.md
[response-creators]: _tools/response-creators.md
[stream-response]: _tools/stream-response.md
[json-fetch]: _tools/json-fetch.md
[json-stream]: _tools/json-stream.md
[request-cookie-store]: _tools/request-cookie-store.md
[extendable-promise]: _tools/extendable-promise.md
[html-rewriter]: _tools/html-rewriter.md
[location-polyfill]: _tools/location-polyfill.md
[deno-fetch-event-adapter]: _tools/deno-fetch-event-adapter.md
[signed-cookie-store]: _tools/signed-cookie-store.md
[encrypted-cookie-store]: _tools/encrypted-cookie-store.md
[resolvable-promise]: _tools/resolvable-promise.md
[structured-json]: _tools/structured-json.md

[ghuc]: https://ghuc.cc
[news]: https://worker-news.deno.dev

***

Worker Tools can be used independently or as a web framework via [__Shed__](./shed){:.flip-title}. 

## How to Use
__Deno__ users can import Worker Tools directly from GitHub as they are written in TypeScript with fully qualified import specifiers:

```js
import * as shed from 'https://ghuc.cc/worker-tools/shed/index.ts'
```

For __other Runtimes__ such as module bundlers, webpack or esbuild, Worker Tools are distributed as node-ified modules that can be installed via __npm__ and behave like regular npm modules

```sh
npm install @worker-tools/shed
```

[__Shed__](./shed){:.flip-title} is the entire collection of Worker Tools under a single roof, which doubles as a complete web framework built for Worker Runtimes.
{:.note title="FYI"}


## Examples
Worker Tools currently doesn't have TodoMVC or similar demo projects, 
but it has two full web services running in the wild that are Open Source and can be used for reference.

- [__ghuc.cc__](_projects/ghuc.md){:.flip-title}
  An entire web service in a single file that can be deployed to Cloudflare Workers or Deno Deploy (with some extra work).
  TBD

- [__Worker News__](_projects/worker-news.md){:.flip-title}
  A Hacker News clone that scraps the site via HTML Rewriter and renders custom streaming HTML via Worker Tools.
  TBD

<!--projects-->

## Questions
### What niche do Worker Tools fill?
Worker Tools are meant to work across Worker Runtimes such as Cloudflare Workers, Deno Deploy and Service Workers in the browser via frontend bundlers.
They are *not meant to be used with NodeJS*. Similar frameworks to Worker Tools typically target either just Deno, just Cloudflare Workers, and usually make no mention of Service Workers.

Worker Tools are "Web Standards Adjacent", meaning it prioritizes and/or mimic web standards based APIs where possible.
The goal is to minimize the number of API patterns frontend developers have to learn when they move into backend development via Worker Runtimes.



<!-- [^1]: They might work in the future if NodeJS decides to implement a variety of web APIs, 
      such as Web Cryptography (see [__workers.js.org__][wkrs] for a full breakdown). 
      Select modules such as [__Extendable Promise__](./extendable-promise){:.flip-title} might work in NodeJS today. -->
