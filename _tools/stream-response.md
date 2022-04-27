---
# THIS FILE WAS COPIED FROM worker-tools/stream-response/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  Fetch API Response objects made from async generators. Build streaming HTML responses or SSE with JS sugar.
links:
  github: https://github.com/worker-tools/stream-response
  ghuc: https://ghuc.cc/worker-tools/stream-response/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/stream-response
  unpkg: https://unpkg.com/browse/@worker-tools/stream-response/
  deno: https://deno.land/x/stream_response
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/stream-response/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/stream_response/index.ts
---

# Stream Response
Fetch API `Response` objects made from async generators. Build streaming HTML responses or SSE with JS sugar.

Example:

<noscript></noscript>
* Table of Contents
{:toc .large-only}

```js
async function* generate() {
  for await (const row of iterAllRows()) {
    yield `${row.join(',')}\n`
  }
}

router.get('/large.csv', () => new StreamResponse(generate(), { 
  headers: [['content-type', 'text/csv']] 
}))
```

Creating a SSE endpoint works much the same way:

```js
async function* sse() {
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    yield 'data: hello\n\n';
  }
}

router.get('/sse', contentType(['text/event-stream']), (req, { type }) => {
  return new StreamResponse(sse(), { headers: [['content-type', type]] })
})
```


*[SSE]: Server Sent Events

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