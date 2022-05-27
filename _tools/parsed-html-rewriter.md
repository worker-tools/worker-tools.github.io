---
# THIS FILE WAS COPIED FROM worker-tools/parsed-html-rewriter/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A DOM-based implementation of Cloudflare Worker's HTMLRewriter.
---

# Parsed HTML Rewriter
A DOM-based implementation of [Cloudflare Worker's `HTMLRewriter`](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter).

***

<noscript></noscript>
* Table of Contents
{:toc .large-only}

___UPDATE: While this module works just fine, I've made [a new verison](../html-rewriter) that is WASM/streaming based for much better performance.___

***

Unlike the original, this implementation parses the entire DOM (provided by [`linkedom`](https://github.com/WebReflection/linkedom)),
and runs selectors against this representation. As a result, it is slower, more memory intensive, and can't process streaming data.

Note that this approach was chosen to quickly implement the functionality of `HTMLRewriter`, as there is currently no JS implementation available.
A better implementation would replicate the streaming approach of [`lol-html`](https://github.com/cloudflare/lol-html), or even use a WebAssembly version of it. _Update: [Now available here](../html-rewriter)_.

However, this implementation should run in most JS contexts (including Web Workers, Service Workers and Deno) without modification and handle many, if not most, use cases of `HTMLRewriter`. 
It should be good enough for testing and offline Workers development.

## Usage
This module can be used in two ways. 

As a standalone module: 

```ts
import { ParsedHTMLRewriter } from '@worker-tools/parsed-html-rewriter'

await new ParsedHTMLRewriter()
  .transform(new Response('<body></body>'))
  .text();
```

Or as a polyfill:

```ts
import '@worker-tools/parsed-html-rewriter/polyfill'

await new HTMLRewriter() // Will use the native version when running in a Worker
  .transform(new Response('<body></body>'))
  .text();
```

### innerHTML
Unlike the current (March 2021) version on CF Workers, this implementation already supports the [proposed `innerHTML` handler](https://github.com/cloudflare/lol-html/issues/40#issuecomment-567126687). 
Note that this feature is unstable and will likely change as the real version materializes.

```ts
await new HTMLRewriter()
  .on('body', {
    innerHTML(html) {
      console.log(html) // => '<div id="foo">bar</div>'
    },
  })
  .transform(new Response('<body><div id="foo">bar</div></body>'))
  .text();
```

## Caveats
- Because this version isn't based on streaming data, the order in which handlers are called can differ. Some measure have been taken to simulate the order, but differences may occur.
- Texts never arrive in chunks. There is always just one chunk, followed by an empty one with `lastInTextNode` set to `true`.



***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/parsed-html-rewriter)
| [ghuc.cc](https://ghuc.cc/worker-tools/parsed-html-rewriter/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/parsed-html-rewriter) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/parsed-html-rewriter/)
· [__deno.land__](https://deno.land/x/parsed_html_rewriter)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/parsed-html-rewriter/master/index.ts)
{:.faded}
<br/>