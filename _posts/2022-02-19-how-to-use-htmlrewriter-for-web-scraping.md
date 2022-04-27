---
image:
  path: /assets/img/hn.jpeg
  srcset:
    2560w: /assets/img/hn.jpeg
    1280w: /assets/img/hn@0,5x.jpeg
    640w:  /assets/img/hn@0,25x.jpeg
description: >
  In this post we'll be implementing a custom Hacker News API by scraping its HTML frontend, the same approach used by the unofficial HN API for Node.
category: guides
---

# How To Use HTMLRewriter for Web Scraping
Cloudflare Workers comes with a streaming HTML rewriting tool programmatically called HTMLRewriter. Unlike HTML parses like [jsdom](https://github.com/jsdom/jsdom) or [linkedom](https://github.com/WebReflection/linkedom), it works at a fraction of their CPU and memory cost since it will simply "pass through" any elements that aren't explicitly requested. 
This makes it also interesting for efficiently scraping web content in Cloudflare Workers.

*Web scraping is getting increasingly difficult, ironically not least due to Cloudflare's own Scrape Shield, which deploys various techniques such as TLS fingerprinting to determine who is accessing a site. CF Workers doesn't hide the fact that it is not a User Agent (i.e. browser). It is only suitable for light scraping uses. Of course the same applies to any HTMLRewriter use case.*
{:.note.faded}

In this post we'll be implementing a custom Hacker News API by scraping its HTML frontend, the same approach used by the [unofficial HN API for Node](https://github.com/cheeaun/node-hnapi). The examples are taken from  [Worker News](../../_projects/worker-news.md){:.flip-title.heading}.


## Introduction
At first glace, HTMLRewriter is a poor fit for HTML scraping. It's API is geared towards rewriting a HTML response, not extracting data from it. 
To familiarize ourselves with the API, here is a slightly modified example from Cloudflare's [tutorial](https://developers.cloudflare.com/workers/tutorials/localize-a-website):

```ts
addEventListener('fetch', ev => ev.respondWith(handleEvent(ev)))

async function handleEvent(ev) {
  const response = await getAssetFromKV(ev)
  return new HTMLRewriter()
    .on("[data-i18n-key]", {
      element(el) { // <-- Everything callback-based
        const i18nKey = el.getAttribute("data-i18n-key");
        const str = strings[i18nKey]
        if (str) el.setInnerContent(str)
      },
    })
    .transform(response) // <-- Returns a `Response`
}
```

First, we note that everything in HTMLRewriter is callback-based.
Second, we note its transform API: It expects to turn one `Response` into another. 
When web scraping, we just want to *consume* a response but not process it in any further or send it to the client.

Besides these ergonomic inconveniences, its biggest drawback is its lack of "inner HTML" API. HTML Rewriter can notify us of element tags or text chunks, but it can't give us the contents of an entire subtree in the DOM.
There is hope that this will be implemented in the future, but for now we've have to work around this. The recently added (still undocumented) `onEndTag` feature finally gives us the tool to make this possible.

* toc
{:toc}

## Consuming a Response 
We first work around the `transform` issue. What makes the example above work is the fact that the `Response` provided by `transform` is passed to `respondWith` in the fetch event.  This causes data to be *pulled* from the stream as it makes its way towards the (browser) client, which sets the whole streaming pipeline in motion. 

Since we won't be sending the craping response to the client, we need a different way to pull data from the stream. A quick and dirty solution is to just await `.text()` on the transformed response. But this causes the entire response body to be loaded into a string:

```ts
const response = await fetch('https://news.ycombinator.com')
if (!response.ok) throw Error('Scrape shield encountered!');

const rewriter = new HTMLRewriter()
  .on(".athing[id]", {
    element(el) { /* TODO */ }
  });

const _text = await rewriter.transform(response).text();
```

While this works, it's still not ideal since it will force the entire document into memory at one point, only to be discarded right afterwards. 

### Streaming Consume
A better solution is to consume the response stream chunk by chunk:

```ts
async function consume(stream: ReadableStream) {
  const reader = stream.getReader();
  while (!(await reader.read()).done) { /* NOOP */ }
}

await consume(rewriter.transform(response).body!);
```

The `consume` helper function, as the name suggests, pulls every chunk from the stream and discards it. 
By accepting a readable stream we keep it generic enough to accept other types of readable streams as well. In the case of a Fetch API `Response`, we access its stream via the `.body` property. 

## Extracting Data
With the transform pipeline set in motion, we can focus turn our attention to the callbacks. Once again, we start with a quick and dirty solution (that may very well be good enough for your use case) and then improve it later.

In the code below we extract the Hacker News item id from every post on the landing page:

```ts
const ids = []
const rewriter = new HTMLRewriter()
  .on(".athing[id]", {
    element(el) {
      ids.push(el.getAttribute('id')!)
    }
  })

await consume(rewriter.transform(response).body!)

// `ids` is now populated:
console.log(ids)
```

We use good old _imperative programming and async/await_ to populate our `ids` array. As I said earlier, this may very well be good enough for you, but it does have the drawback of consuming the entire response before we continue processing the ids. In other words, we lose the streaming aspect of HTMLRewriter. 

### Extracting Data Streams
A more fancy approach is to turn the callbacks into an async iterable that we process as data arrives in a `for await` loop. For a refresher on asynchronous data processing in JavaScript, see my own [Async Generators in the Wild](https://qwtel.com/posts/software/async-generators-in-the-wild/){:.heading}.

Turning a (multi-)callback API into an async iterable is not trivial. It involves two steps:
1. First we turn callback invocations into events,
2. then we use a utility function to turn the event stream into an async iterable.

The utility function is provided by yours truly as [`event-target-to-async-iter`](https://www.npmjs.com/package/event-target-to-async-iter), but the code is simply an adaptation of Node's [`on`](https://github.com/nodejs/node/blob/5b59e14dafb43b907e711cb418bb9c302bce2890/lib/events.js#L1017) utility function with the Node-specific parts removed.


```ts
const target = new EventTarget(); // 1

const rewriter = new HTMLRewriter()
  .on(".athing[id]", {
    element(el) {
      target.dispatchEvent(new CustomEvent('data', {  // 2
        detail: el.getAttribute('id') 
      }));
    }
  })

const iter = evenTargetToAsyncIter(target, 'data'); // 3

consume(rewriter.transform(response).body!) // 4
  .catch(e => iter.throw(e)) // 5
  .then(() => iter.return()) // 6

for await (const { detail: id } of iter) { // 7
  console.log(id)
}
```

There is a lot to unpack here. 
First of all, any experienced developer will undoubtedly spot the many of ways of making this more ergonomic, but for our purposes here I left it as verbose as is.

The goal is to process scraped data in (7) via `for await` loop. 
This leaves us with many opportunities down the line, such as streaming JSON for APIs, streaming HTML, Server Sent Events, etc...

While it is possible to dispatch events on the global scope (which implements `EventTarget`), it is advisable to use a new `EventTarget` as in (1) instead. Recent compatibility dates of CF Workers support this out of the box. 

Unfortunately the same can't be said for `CustomEvent` (2), but a [minimal polyfill](#custom-event-polyfill) is trivially implemented. 
Custom Events are good use here, as the provide a generic `detail` property that we can use to store data. 
We fire them under the generic `data` event name. You can pick anything here, it only needs to match the key used in (3).

In (3) we turn the event target into an async iterable. Note that this only sets up queues and event listeners, but does not do anything by itself. 

The process only starts once we start pulling data in (4). What's important is that **we do not `await` here**! Doing so would defeat the purpose of setting up the streaming pipeline, as we wait for the entire response to be consumed (filling up the internal queues of `eventTargetToAsyncIter`) before continuing the execution.

Not awaiting a promise opens us up to the possibility of an unhandled exception, so we need catch it in (5) and forward it to the async iterable via `throw()`. This will cause the error to show up in (7) during for await looping.

Finally, in (6) we prevent for-await from getting stuck in an endless loop. Event targets, unlike async iterables, do not have a concept of an end, so we manually call `return()` on the iterable when the response stream is fully consumed.


## Extracting HTML Subtrees
We make up for HTMLRewriter's lack of `innerHTML` by combining two selectors and use of the recently added `onEndTag` API:

```ts
const commText = '';
const rewriter = new HTMLRewriter()
  .on('.fatitem .commtext', { // 1
    text({ text }) { commText += text }
  })
  .on('.fatitem .commtext *', { // 2
    element(el) { 
      const maybeAttrs = [...el.attributes].map(([k, v]) => ` ${k}="${v}"`).join('');
      commText += `<${el.tagName}${maybeAttrs}>`;
      el.onEndTag(endTag => { 
        commText += `</${endTag.name}>`;
      });
    }
  })
```

If we only used the first selector and applied it to, e.g. [this comment](https://news.ycombinator.com/item?id=26631078) we would get the following:

    There's lots of things going on this this space. It seems every other day I discover another 
    Cloudflare Workers-like implementation (granted, most of them are for testing/development). 
    I'm cataloging them here for anyone who's interested: https://workers.js.org
  
This seems correct at first, but it is missing the `<a>` tag on the link. This works because the `text` callback delivers every text chunk in the entire subtree. It does however ignore all the tags.

Once we add the second selector with the extra `*`, we are notified of *all* opening and closing tags *in the entire subtree* and can append them to the string. 
Because HTMLRewriter is a stream processor internally, we can expect these callbacks to be called in the correct order.

<br>

## Appendix
### Custom Event Polyfill
Note that this is by no means a spec-compliant implementation of CustomEvent, but it works for our purpose here. 

```ts
if (!('CustomEvent' in self)) {
  class CustomEvent<T = any> extends Event {
    readonly detail: T; 
    constructor(event: string, { detail }: CustomEventInit<T>) { 
      super(event); 
      this.detail = detail as T;
    }
  }

  Object.defineProperty(self, 'CustomEvent', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: CustomEvent
  });
}
```
