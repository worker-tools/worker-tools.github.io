---
# THIS FILE WAS COPIED FROM worker-tools/extendable-promise/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A promise that can be delayed (extended) via repeated calls to waitUntil.
links:
  github: https://github.com/worker-tools/extendable-promise
  ghuc: https://ghuc.cc/worker-tools/extendable-promise/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/extendable-promise
  unpkg: https://unpkg.com/browse/@worker-tools/extendable-promise/
  deno: https://deno.land/x/extendable_promise
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/extendable-promise/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/extendable_promise/index.ts
---

# Extendable Promise

A promise that can be delayed (extended) via repeated calls to `waitUntil`.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

"Extendable" here refers to the ability to extend the duration of the promise, not inheritance/subtypes/etc. 
The name and API are modelled after the
[`ExtendableEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent)
interface that was introduced to the web part of the Service Worker API. As
such, it provides a `waitUntil` method that takes a promise as argument that
extends settlement of the parent promise until all promises that were
added in this way have settled. You can think about it like
`Promise.allSettled`, except you can add promises to the list after the fact. Example:

```js
const p = new ExtendablePromise(timeout(200).then(() => 1));
await timeout(100)
p.waitUntil(timeout(300).then(() => Promise.reject(Error('2'))));

const res = await p; // total duration ~400ms (100 + 300)

assertEquals(res, [
  { status: "fulfilled", value: 1 },
  { status: "rejected", reason: Error('2') },
]);
```

After all promises have settled, further calls to `waitUntil` become no-ops.

The constructor takes a promise as argument, which sets the minimum duration for the extendable promise. 

If an extendable promise is created without supplying an initial promise, it is "idle" (`await`ing it pauses execution) until the first call to `waitUntil` "primes" it. 

Initializing it with a synchronous value or a settled promise immediately settles the extendable promise with that value and all calls to `waitUntil` are no-ops.

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