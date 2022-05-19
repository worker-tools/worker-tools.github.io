---
# THIS FILE WAS COPIED FROM worker-tools/async-queue/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A queue implementation that delivers values asynchronously. Useful for implementing various async iterable logic.
---

# Async Queue
A queue implementation that delivers values asynchronously. Useful for implementing various async iterable logic.

Producers can provide values to the queue via `enqueue`, while consumers can request them via `dequeue` or `next`, 
which return a promise that resolves with the next value in the queue. If the queue is currently empty, 
the promise will resolve once a new value gets pushed into the queue.
Repeated calls to `dequeue` with an empty queue will deliver results in the order they have been requested.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

The queue also implements the async iterable interface, meaning it can be used in a for-await loop:

```ts
const q = new AsyncQueue()
q.push(1, 2, 3)
for await (const value of q) {
  // ...
}
```

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/async-queue)
/ [ghuc.cc](https://ghuc.cc/worker-tools/async-queue/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/async-queue) 
/ [Browse Package](https://unpkg.com/browse/@worker-tools/async-queue/)
· [__deno.land__](https://deno.land/x/async_queue)
/ [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/async-queue/master/index.ts)
{:.faded}
<br/>