---
# THIS FILE WAS COPIED FROM worker-tools/shed/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  Shed is the entire collection of Worker Tools under a single roof, which doubles as a complete web framework built for Worker Environments.
links:
  github: https://github.com/worker-tools/shed
  ghuc: https://ghuc.cc/worker-tools/shed/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/shed
  unpkg: https://unpkg.com/browse/@worker-tools/shed/
  deno: https://deno.land/x/shed
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/shed/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/shed/index.ts
---

# Shed
__Shed__ is the entire collection of [__Worker Tools__](https://workers.tools) under a single roof, which doubles as a complete web framework built for Worker Environments.

***

<noscript></noscript>
* Table of Contents
{:toc .large-only}

___Work In Progress___

***

## Tools
- 🧭 [__Worker Router__](../router) --- Complete routing solution that works across CF Workers, Deno and Service Workers
- 🔋 [__Worker Middleware__](../middleware) --- A suite of standalone HTTP server-side middleware with TypeScript support
- 📄 [__Worker HTML__](../html) --- HTML templating and streaming response library
- 📦 __Storage Area__ --- Storage abstractions for [Cloudflare's KV](../cloudflare-kv-storage) and [Deno](../deno-kv-storage)
- ↩️ [__Response Creators__](../response-creators) --- Factory functions for responses with pre-filled status and status text
- 🏞 [__Stream Response__](../stream-response) --- Use async generators to build streaming responses for SSE, etc...
- 🥏 [__JSON Fetch__](../json-fetch) --- Drop-in replacements for Fetch API classes with first class support for JSON.
- 🍪 [__Request Cookie Store__](../request-cookie-store) --- An implementation of the Cookie Store API for use in request handlers.
<!-- - 🍪 [__Signed Cookie Store__](../signed-cookie-store) --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - 🍪 [__Encrypted Cookie Store__](../encrypted-cookie-store) --- An implementation of the Cookie Store API for use in request handlers. -->
<!-- - ⏱ [__Resolvable Promise__](../resolvable-promise) --- A promise that is resolvable or rejectable after it was created. -->
<!-- - ⏱ [__Extendable Promise__](../extendable-promise) --- A promise that can be delayed/extended via repeated calls to `waitUntil`. -->
<!-- - ❓ __JSON Parse Stream__ --- TODO -->
<!-- - ❓ __JSON Stringify Stream__ --- TODO -->

*[SSE]: Server Sent Events

Worker Tools also includes a number of polyfills that help bridge the gap between different Worker Environments:
- ✏️ [__HTML Rewriter__](../html-rewriter) --- Cloudflare's HTML Rewriter for use in Deno, browsers, etc...
- 📍 [__Location Polyfill__](../location-polyfill) --- A `Location` polyfill for Cloudflare Workers.
- 🦕 [__Deno Fetch Event Adapter__](../deno-fetch-event-adapter) --- Dispatches global `fetch` events using Deno’s native HTTP server.

## How to Use
__Deno__ users can import Worker Tools directly from GitHub as they are written in TypeScript with fully qualified import specifiers:

```js
import { WorkerRouter } from 'https://ghuc.cc/worker-tools/shed/index.ts'
```

For __other environments__ such as module bundlers, webpack or esbuild, Worker Tools are distributed as node-ified modules that can be installed via __npm__ and behave like regular npm modules

```sh
npm install @worker-tools/shed
```

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