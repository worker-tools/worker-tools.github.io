---
# THIS FILE WAS COPIED FROM worker-tools/resolvable-promise/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A promise that is resolvable (or rejectable) after it was created.
links:
  github: https://github.com/worker-tools/resolvable-promise
  ghuc: https://ghuc.cc/worker-tools/resolvable-promise/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/resolvable-promise
  unpkg: https://unpkg.com/browse/@worker-tools/resolvable-promise/
  deno: https://deno.land/x/resolvable_promise
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/resolvable-promise/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/resolvable_promise/index.ts
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
[__GitHub__]({{ page.links.github }})
/ [ghuc.cc]({{ page.links.ghuc }})
· [__NPM__]({{ page.links.npm }}) 
/ [Browse Package]({{ page.links.unpkg }})
· [__deno.land__]({{ page.links.deno }})
/ [Docs]({{ page.links.docs }})
{:.faded}
<br/>