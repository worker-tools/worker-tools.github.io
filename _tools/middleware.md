---
# THIS FILE WAS COPIED FROM worker-tools/middleware/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A suite of standalone HTTP server middlewares for Worker Runtimes.
---

# Worker Middleware

A suite of standalone HTTP server middlewares for Worker Runtimes.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

It is meant to be used with [Worker Router](../router), but can also be used with simple request handlers.


## Cookies
Supports singed, unsigned and encrypted cookies. 

Signed and encrypted cookies use the Web Cryptography API internally to en/decrypt sign and verify cookies. 

```js
router.get('/', signedCookies({ secret: 'password123' }), (request, { cookies, cookieStore }) => {
  cookieStore.set('foo', 'bar') // no await necessary
  return ok(cookie.foo === 'bar' ? 'Welcome back!' : 'Welcome!')
})
```

The `cookieStore` property implements the web's Cookie Store API for maximum standard compatibility. 
For better DX, the middleware also provides a read-optimized `cookies` property, which are the request's cookies parsed into a plain JS object. 

Modifying cookies is done via the cookie store. While the cookie store API is async, there is no need to await every result, as the cookie store keeps track of all operations and awaits them internally before sending the headers.

## Session
Session middleware provides a plain JavaScript object that is serialized/deserialized via the Structured Clone Algorithm, i.e. it behaves largely the same as storing an object in IndexedDB. In other words, it can have Maps, Sets, and ArrayBuffers, etc.

### `cookieSession`
The cookie session encodes the entire session object into a cookie and is meant for prototyping and small use cases. 

```js
router.get('/', combine(
  signedCookies({ secret: 'password123' }),
  cookieSession({ 
    defaultSession: { id: '', iv: new Uint8Array([]) }
  }) 
), (request, { session }) => {
  if (!session.id) {
    session.id = crypto.randomUUID();
    session.iv = crypto.getRandomValues(new Uint8Array(32))
  }
  return ok()
})
```

### `storageSession`
The storage session uses a KV Storage API-compatible storage object to persist the session object between requests. 
Worker Tools has [storage adapters](https://workers.tools/kv-storage) for Cloudflare's KV storage and SQLite/Postgres for Deno.

```js
router.get('/', combine(
  signedCookies({ secret: 'password123' }), 
  storageSession({ 
    storage: new StorageArea('sessions'),
    defaultSession: { id: '', iv: new Uint8Array([]) },
  }) 
), (request, { session }) => {
  if (!session.id) {
    session.id = crypto.randomUUID();
    session.iv = crypto.getRandomValues(new Uint8Array(32))
  }
  return ok()
})
```

Both `cookieSession` and `storageSession` must be combined with a cookie middleware.

The session object is persisted once at the end of the request.

## Body Parser
Because Worker Runtimes already provide helpers like `.json()` and `.formData()` in the Request type, the need for a body parser is less pronounced. The value of Middleware's body parser mainly comes from content negotiation and rejecting large payloads:

### `defaultBodyParser`

```js
router.any('/form', 
  defaultBodyParser({ maxSize: 1024**2 }), // 1MB 
  (req, { accepted, ...ctx }) => {
    switch (accepted) {
      case 'application/x-www-form-urlencoded': {
        ctx.form // instanceof URLSearchParams
        return ok()
      }
      case 'multipart/form-data': {
        ctx.formData // instanceof FormData
        return ok()
      }
      case 'application/json': {
        ctx.json
        return ok()
      }
      case 'application/octet-stream':
      case 'application/x-binary': { // commonly used non-standard mime type
        ctx.blob // instanceof Blob
        ctx.buffer // instanceof ArrayBuffer
        return ok()
      }
      default: {
        return ok()
      }
    }

    return ok()
  })
```

### `bodyParser`
You can also limit what is acceptable to the endpoint by combining the [content negotiation middleware](#content-negotiation) and `bodyParser`:

```js
router.any('/form', combine(
  accepts(['application/x-www-form-urlencoded', 'multipart/form-data']), 
  bodyParser()
), (request, { accepted, body }) => {
  switch (accepted) {
    case 'application/x-www-form-urlencoded': {
      body // instanceof URLSearchParams
      return ok()
    }
    case 'multipart/form-data': {
      body // instanceof FormData
      return ok()
    }
  }
})
```

NOTE: It's currently only possible to limit what the body parser accepts.

## Content Negotiation
Provides generic content negotiation for HTTP endpoints.   


### `contentTypes`
The `contentTypes` middleware lets you specify what content types the endpoint can *provide*. 
For example, we can build a mini deno.land that either serves raw JavaScript or a HTML page depending on accepts header:

```js
router.get('/form', combine(
  contentTypes(['text/html', 'text/javascript'])
), (request, { type }) => {
  // `type` is either 'text/html' or 'application/json',
  // depending on the client's `Accept` header (best match)
  switch (type) {
    case 'text/javascript': 
      return ok('function foo() {}', { 
        headers: { 'content-type': type } 
      })
    case 'text/html': 
      return ok('HTML documentation for JS', {
        headers: { 'content-type': type } 
      })
  }
}
```

## Basics
TBD

<!-- ## Use with Netlify Functions
```ts
import { Context } from "netlify:edge"
import { 
  withMiddleware, 
  combine, 
  signedCookies, 
  cookieSession, 
} from 'https://ghuc.cc/worker-tools/middleware/index.ts';

export default withMiddleware(
  combine(
    signedCookies({ secret: 'password123' }), 
    cookieSession(),
  ), 
  async (req, { cookies, body, args: [, _context] }) => {
    const context = _context as Context
    return await context.next()
  }
)
``` -->

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/middleware)
| [ghuc.cc](https://ghuc.cc/worker-tools/middleware/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/middleware) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/middleware/)
· [__deno.land__](https://deno.land/x/workers_middleware)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/middleware/master/index.ts)
{:.faded}
<br/>