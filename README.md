---
layout: landing
logo: |
  <img src="assets/img/logo.svg" alt="Logo" width="172" height="172">
description: >
  Tools for writing HTTP servers in [__Worker Environments__](https://workers.js.org/){:.external} such as [__Cloudflare Workers__](https://workers.cloudflare.com).
buttons: >
  [Get Started](#how-to-use){:.btn.btn-primary}
  [Guides](/guides){:.btn.btn-default style="font-weight:normal"}
---

# Worker Tools

Worker Tools are a collection of TypeScript libraries for writing web servers in [Worker Environments][1] such as [Cloudflare Workers][4] and [Deno Deploy][5]. 

## Tools
<!-- It includes the following: -->
- 🧭 [__Worker Router__](./router){:.flip-title} --- Complete routing solution that works across CF Workers, Deno and Service Workers
- 🔋 [__Worker Middleware__](./middleware){:.flip-title} --- A suite of standalone HTTP server-side middleware with TypeScript support
- 📄 [__Worker HTML__](./html){:.flip-title} --- HTML templating and streaming response library
- 📦 __Storage Area__ --- Storage abstractions for [Cloudflare's KV](./cloudflare-kv-storage) and [Deno](./deno-kv-storage)
- ↩️ [__Response Creators__](./response-creators){:.flip-title} --- Factory functions for responses with pre-filled status and status text
- 🏞 [__Stream Response__](./stream-response){:.flip-title} --- Use async generators to build streaming responses for SSE, etc...
- 🥏 [__JSON Fetch__](./json-fetch){:.flip-title} --- Drop-in replacements for Fetch API classes with first class support for JSON.
- 🍪 [__Request Cookie Store__](./request-cookie-store){:.flip-title} --- An implementation of the Cookie Store API for use in request handlers.
<!-- - 🍪 [__Signed Cookie Store__](./signed-cookie-store){:.flip-title} --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - 🍪 [__Encrypted Cookie Store__](./encrypted-cookie-store){:.flip-title} --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - ⏱ [__Resolvable Promise__](./resolvable-promise){:.flip-title} --- A promise that is resolvable or rejectable after it was created. -->
<!-- - ⏱ [__Extendable Promise__](./extendable-promise){:.flip-title} --- A promise that can be delayed/extended via repeated calls to `waitUntil`. -->
<!-- - ❓ __JSON Parse Stream__ --- TODO -->
<!-- - ❓ __JSON Stringify Stream__ --- TODO -->

*[SSE]: Server Sent Events

Worker Tools also includes a number of polyfills that help bridge the gap between different Worker Environments:
- ✏️ [__HTML Rewriter__](./html-rewriter){:.flip-title} --- Cloudflare's HTML Rewriter for use in Deno, browsers, etc...
- 📍 [__Location Polyfill__](./location-polyfill){:.flip-title} --- A `Location` polyfill for Cloudflare Workers.
- 🦕 [__Deno Fetch Event Adapter__](./deno-fetch-event-adapter){:.flip-title} --- Dispatches global `fetch` events using Deno’s native HTTP server.

Worker Tools also maintains a number of (web-) services:

- ⚙️ [__workers.js.org__][wkrs] --- Educational site about the state of Worker Environments.
- 🦕 [__ghuc.cc__][ghuc] --- Import modules directly from GitHub into Deno with a familiar API. 

***

Worker Tools can be used independently or as a web framework via [__Shed__](./shed){:.flip-title}. 

## How to Use
__Deno__ users can import Worker Tools directly from GitHub as they are written in TypeScript with fully qualified import specifiers:

```js
import { WorkerRouter } from 'https://ghuc.cc/worker-tools/shed/index.ts'
```

For __other environments__ such as module bundlers, webpack or esbuild, Worker Tools are distributed as node-ified modules that can be installed via __npm__ and behave like regular npm modules

```sh
npm install @worker-tools/shed
```

[__Shed__](./shed){:.flip-title} is the entire collection of Worker Tools under a single roof, which doubles as a complete web framework built for Worker Environments.
{:.note title="FYI"}

<!-- ## Examples

- [**ghuc.cc**](https://github.com/worker-tools/ghuc.cc)
  An entire web service in a single file that can be deployed to Cloudflare Workers or Deno Deploy (with some extra work).
  TBD

- [**news.workers.tools**](https://github.com/qwtel/edge-hn)
  A Hacker News clone that scraps the site via HTML Rewriter and renders custom streaming HTML via Worker Tools.
  TBD -->

## Questions
### What niche do Worker Tools fill?
Worker Tools are meant to work across Worker Environments such as Cloudflare Workers, Deno Deploy and Service Workers in the browser via frontend bundlers.
They are *not meant to be used with NodeJS*[^1]. Similar frameworks to Worker Tools typically target either just Deno, just Cloudflare Workers, and usually make no mention of Service Workers.

Worker Tools are "Web Standards Adjacent", meaning it prioritizes and/or mimic web standards based APIs where possible.
The goal is to minimize the number of API patterns frontend developers have to learn when they move into backend development via Worker Environments.


[1]: https://workers.js.org/
[2]: https://www.npmjs.com/org/worker-tools
[3]: https://github.com/worker-tools
[4]: https://workers.cloudflare.com
[5]: https://deno.com

[wkrs]: https://workers.js.org
[ghuc]: https://ghuc.cc

[^1]: They might work in the future if NodeJS decides to implement a variety of web APIs, 
      such as Web Cryptography (see [__workers.js.org__][wkrs] for a full breakdown). 
      Select modules such as [__Extendable Promise__](./extendable-promise){:.flip-title} might work in NodeJS today.
