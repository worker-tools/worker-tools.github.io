---
# THIS FILE WAS COPIED FROM worker-tools/stream-response/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  Fetch API Response objects made from async generators. Build streaming HTML responses or SSE with JS sugar.
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
[__GitHub__](https://github.com/worker-tools/stream-response)
| [ghuc.cc](https://ghuc.cc/worker-tools/stream-response/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/stream-response) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/stream-response/)
· [__deno.land__](https://deno.land/x/stream_response)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/stream-response/master/index.ts)
{:.faded}
<br/>