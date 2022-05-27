---
# THIS FILE WAS COPIED FROM worker-tools/event-target-polyfill/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A polyfill for EventTarget (and Event), meant to run in Cloudflare Workers (also works in older version of node or possibly IE 11) that has the most accurate set of characteristics of EventTarget that can be provided.
---

# Event Target Polyfill

A polyfill for `EventTarget` (and `Event`), meant to run in Cloudflare Workers (also works in older version of node or possibly IE 11) that has the most accurate set of characteristics of `EventTarget` that can be provided.

<noscript></noscript>
* Table of Contents
{:toc .large-only}


## Usage

```js
import '@worker-tools/event-target-polyfill';

const et = new EventTarget();

et.addEventListener('test', () => console.log('hit!'));

et.dispatchEvent(new Event('test'));
```

## Development

This library has no dependencies. Even development dependencies. To test just run `npm test`. It runs a script, and if it finishes without error, the tests pass.



***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/event-target-polyfill)
| [ghuc.cc](https://ghuc.cc/worker-tools/event-target-polyfill/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/event-target-polyfill) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/event-target-polyfill/)
· [__deno.land__](https://deno.land/x/event_target_polyfill)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/event-target-polyfill/master/index.ts)
{:.faded}
<br/>