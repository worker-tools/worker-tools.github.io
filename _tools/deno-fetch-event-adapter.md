---
# THIS FILE WAS COPIED FROM worker-tools/deno-fetch-event-adapter/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  Dispatches global fetch events using Deno's native HTTP server.
links:
  github: https://github.com/worker-tools/deno-fetch-event-adapter
  ghuc: https://ghuc.cc/worker-tools/deno-fetch-event-adapter/mod.ts
  npm: https://www.npmjs.com/package/@worker-tools/deno-fetch-event-adapter
  unpkg: https://unpkg.com/browse/@worker-tools/deno-fetch-event-adapter/
  deno: https://deno.land/x/fetch_event_adapter
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/deno-fetch-event-adapter/master/mod.ts
  # docs: https://doc.deno.land/https://deno.land/x/fetch_event_adapter/mod.ts
---

# Deno Fetch Event Adapter

Dispatches global `fetch` events using Deno's [native HTTP server](https://deno.com/blog/v1.9#native-http%2F2-web-server).

<noscript></noscript>
* Table of Contents
{:toc .large-only}

~~It is mostly intended as a temporary solution until Deno [implements the Service Worker spec](https://github.com/denoland/deno/issues/5957#issuecomment-722568905) directly.~~   
This has been scrapped, but this module works just fine for local testing, developing Cloudflare Workers while offline, and similar use cases.

## Example

```ts
// file: "worker.js"
import 'https://deno.land/x/fetch_event_adapter/listen.ts';

// This module adds a global `FetchEvent`
if (typeof FetchEvent !== 'undefined') console.log(true);

// This module also adds global type declarations, s.t. this type-checks:
self.addEventListener('fetch', event => {
  const ip = event.request.headers.get('x-forwarded-for');
  event.respondWith(new Response(`Hello ${ip ?? 'World'}`));
});
```

Your script needs the `--allow-net` permissions. It also requires a `--location`,
to know on which port to listen for incoming connections:

```sh
deno run --allow-net --location=http://localhost:8000 worker.js
```

If you set the `--location` to either HTTPS or port 443, you have to provide a `--cert` and a `--key` parameter.
Your script will also need the read permission to read the files:

```sh
deno run --allow-net --allow-read --location=https://localhost:8000 worker.js \
  --cert=./path/to/cert.pem \
  --key=./path/to/key.pem
```

## Error Handling
If an error occurs during estabslishing a connection (e.g. invalid certificate, etc...), the error is dispatched as a global `error` event rather then crashing the process. You can add custom logging like this:

```ts
self.addEventListener('error', event => {
  console.warn(event.message);
  console.warn(event.error);
});
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