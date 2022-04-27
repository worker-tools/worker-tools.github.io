---
# THIS FILE WAS COPIED FROM worker-tools/location-polyfill/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A Location polyfill for Cloudflare Workers.
links:
  github: https://github.com/worker-tools/location-polyfill
  ghuc: https://ghuc.cc/worker-tools/location-polyfill/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/location-polyfill
  unpkg: https://unpkg.com/browse/@worker-tools/location-polyfill/
  deno: https://deno.land/x/location_polyfill
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/location-polyfill/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/location_polyfill/index.ts
---

# Location Polyfill

A [`Location`](https://developer.mozilla.org/docs/Web/API/Window/location) polyfill for Cloudflare Workers.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

## Usage

Import the polyfill in your application code. 
Make sure it's included at the top, before any other dependencies that register `fetch` event listeners.

```ts
import '@worker-tools/location-polyfill';
```

This will populate the global `location` field with the `url` field from incoming requests. 
In CF Workers, this will typically be your script's `workers.dev` address.

*Note that the `location` field will be overwritten with each request!* This is because I haven't been able to find a way to access the worker's URL outside a `fetch` event context. Let me know if there's a better way!

To avoid sniffing the url from every request, you can provide the location via a global variable called `WORKER_LOCATION`.
In CF Workers, add the following to your `wrangler.toml` to define this variable.

```toml
[vars]
  WORKER_LOCATION = 'http://localhost:8787'
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