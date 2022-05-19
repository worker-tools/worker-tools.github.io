---
# THIS FILE WAS COPIED FROM worker-tools/resolvable-promise/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A promise that is resolvable (or rejectable) after it was created.
---

# Resolvable Promise

A promise that is resolvable (or rejectable) after it was created.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

```ts
const promise = new ResolvablePromise()
promise.then(x => console.log('Resolved!', x))
promise.resolve({ foo: 'bar' })
```

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/resolvable-promise)
/ [ghuc.cc](https://ghuc.cc/worker-tools/resolvable-promise/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/resolvable-promise) 
/ [Browse Package](https://unpkg.com/browse/@worker-tools/resolvable-promise/)
· [__deno.land__](https://deno.land/x/resolvable_promise)
/ [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/resolvable-promise/master/index.ts)
{:.faded}
<br/>