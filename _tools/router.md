---
# THIS FILE WAS COPIED FROM worker-tools/router/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A router for Worker Environments such and Cloudflare Workers or Service Workers.
links:
  github: https://github.com/worker-tools/router
  ghuc: https://ghuc.cc/worker-tools/router/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/router
  unpkg: https://unpkg.com/browse/@worker-tools/router/
  deno: https://deno.land/x/workers_router
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/router/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/workers_router/index.ts
---

# Worker Router
A router for [Worker Environments](https://workers.js.org) such and Cloudflare Workers or Service Workers.

***

<noscript></noscript>
* Table of Contents
{:toc .large-only}

___Work In Progress___

***

This router is inspired by previous work such as `tiny-request-router` and `itty-router`, but it
improves on them by providing better support for middleware, type inference, nested routing, and broader URL matching for use in service workers.

## 🆓 Type Inference
The goal of Worker Router is to *infer types based on usage* so that **no explicit typing** is required for standard use cases.
This allows even JavaScript users to benefit from inline documentation and API discoverability. For example,

```js
const router = new WorkersRouter(basics())
  .get('/about', (req, { userAgent }) => ok())
  .get('/login', unsignedCookies(), (req, { userAgent, cookies }) => ok())
```

In this example your editor can infer the types and documentation for
  - `userAgent`, provided by the `basics` middleware for the entire router
  - `cookies`, provided by the `unsignedCookies` middleware for this route only


## 🔋 Functional Middleware
Worker Router middlewares are *just function* that add properties to a generic context object. As such, they can be *mixed and matched* using standard tools from functional programming.

For convenience, this module provides a `combine` utility to combine multiple middlewares into one.

```js
const myReusableMW = combine(
  basics(), 
  signedCookies({ secret: 'password123' }), 
  cookieSession({ user: '' })
);

const router = new WorkersRouter()
  .get('/', myReusableMW, () => ok())
  .post('/', combine(myReusableMW, bodyParser()), () => ok())
```

Note that type inference is maintained when combining middleware!


## 🪆 Nested Routing
Worker Router supports delegating entire sub routes to another router:

```js
const itemRouter = new WorkerRouter()
  .get('/', (req, { params }) => ok(`Matched "/item/`))
  .get('/:id', (req, { params }) => ok(`Matched "/item/${params.id}`))

const router = new WorkersRouter()
  .get('/', () => ok('Main Page'))
  .use('/item*', itemRouter)
```

TODO: Provide parent matches to child router...

## ⚙️ Ready for Service... Worker
Internally, this router uses [`URLPattern`](https://web.dev/urlpattern/) for routing, which allows it match URLs in the broadest sense. 
For example, the following router, meant to be used in a Service Worker, can handle internal requests as well as intercept calls to external resources:

```js
// file: "sw.js"
const router = new WorkersRouter()
  .get('/', () => ok('Main Page'))
  .get('/about', () => ok('About Page'))
  .external('https://plausible.io/api/*', req => {
    // intercepted
  })
```

## 💥 Error Handling Without Even Trying
Worker Router has first class support for error handling. Its main purpose is to let you write your handlers without having to wrap everything inside a massive `try {} catch` block. Instead, you can define special recover routes that get invoked when something goes wrong. 

```js
const router = new WorkersRouter()
  .get('/', () => ok('Main Page'))
  .get('/about', () => { throw Error('bang') })
  .recover('*', (req, { response }) => 
    new Response(`Something went wrong`, response)
  );
```

## ✅ Works with Workers
Worker Router comes with out of the box support for a variety of Worker Environments:

To use it in an environment that provides a global `fetch` event, use

```js
self.addEventListener('fetch', router)
```

(This works because the router implements the [`EventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) interface)

To use it with Cloudflare's module workers, use

```js
export default router
```

(This works because the router implements a `fetch` method with compatible interface)

To use it with Deno/Deploy's `serve` function, use

```js
serve(router.serveCallback)
```

<!-- While Worker Router is influenced by earlier work, it is __not in the tradition__ of express, koa and other modify-in-place routers, save for aspects of its high level  API.
At it's core, Worker Router is a function of `(req: Request, ctx: Context) => Promise<Response>`. In this model, 
middleware is another function that *adds* properties to the context, which is fully tracked by the type system. Conversely, middleware that is not applied is also absent and not polluting the context object. -->

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