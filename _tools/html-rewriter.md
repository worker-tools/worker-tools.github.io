---
# THIS FILE WAS COPIED FROM worker-tools/html-rewriter/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  WASM-based implementation of Cloudflare's HTML Rewriter for use in Deno, browsers, etc.
---

# HTML Rewriter

WASM-based implementation of Cloudflare's HTML Rewriter for use in Deno, browsers, etc. 

<noscript></noscript>
* Table of Contents
{:toc .large-only}

It uses `lol-html` under the hood, the same implementation used by Cloudflare Workers. It is based on [Miniflare's WASM build](https://github.com/mrbbot/html-rewriter-wasm).

## Installation
This package includes 2 versions of HTML Rewriter. 

`index.ts` loads the WASM that is co-located with this module via fetch and (streaming-) instantiates the module that way. In Deno, this works via file system (if you've downloaded the module) and web (when loading from deno.land/x or even githubusercontent.com). 
However, if you are using this version with other tooling, depending on the bundler and configuration the WASM source may or may not be included...

`base64.ts` has the required WASM inlined as compressed base64. The total size is 447K (345K gzipped). 
This ensures that HTML Rewriter is working properly when bundled, offline, etc. 
The "hackyness" of ~400K of inlined WASM and relying on [`DecompressionStream`][dcs] is significant (without compression, the file size would be 1.2MB), but its simplicity makes it easier to get it to work with various bundlers (including Deno's own, as of this writing).

[dcs]: https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream

### Use in Browser
For use in the browser it's best to install the "node-ified" package from npm and use it with a bundler.

```sh
npm install @worker-tools/html-rewriter
```

Which version of HTML Rewriter to pick depends on which bundler you are using:

For **Webpack 4**, it's best to use the non-ESM base64 version via its full path: `@worker-tools/html-rewriter/script/base64`. 

**Webpack 5** treats the regular version correctly by default, which can be imported as `@worker-tools/html-rewriter`. 

For **esbuild** it's best to use the base64-version via `@worker-tools/html-rewriter/base64`. 

You can explore the full contents of the npm package [here](https://unpkg.com/browse/@worker-tools/html-rewriter/).

## Usage

```ts
import { 
  HTMLRewriter 
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts'

new HTMLRewriter()
  .on("p", {
    element(element) { 
      element.tagName = "h1" 
    },
  })
  .transform(new Response('<p class="red">test</p>'))
  .text().then(x => console.log(x))
```

For more on how to use HTMLRewriter, see the [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/).


## Building

Make sure you've initialized all git submodules. It is 2 levels deep.

```sh
git submodule update --init --recursive
```

Make sure you have `rustup` installed. Then run

```sh
make dist
```

This will build a custom version of `wasm-pack` first, then use it to compile `lol-html` to WASM. Please see the submodules for details on why this is necessary.

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/html-rewriter)
| [ghuc.cc](https://ghuc.cc/worker-tools/html-rewriter/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/html-rewriter) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/html-rewriter/)
· [__deno.land__](https://deno.land/x/html_rewriter)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/html-rewriter/master/index.ts)
{:.faded}
<br/>