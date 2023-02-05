---
# THIS FILE WAS COPIED FROM worker-tools/typed-event-target/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  This is the Typed Event Target library you are looking for.
---

# Typed Event Target
This is the Typed Event Target library you are looking for.

## Usage

<noscript></noscript>
* Table of Contents
{:toc .large-only}

```ts
import { TypedEventTarget } from "@worker-tools/typed-event-target";

// Can use custom event maps:
class Foo extends TypedEventTarget<{ 
  "error": ErrorEvent
  "custom": CustomEvent<string>
}> {
  /* ... */
}

// Enjoy correctly typed event here:
const foo = new Foo()
foo.addEventListener("error", ev => { /* ev: ErrorEvent */ })
foo.addEventListener("custom", ev => { /* ev: CustomEvent<string> */ })
foo.addEventListener("unknown", ev => { /* ev: Event */})

// Can use built-in event maps from e.g. lib.dom.d.ts:
class WorkerLike extends TypedEventTarget<WorkerEventMap> { /* ... */ }

// Can be used as a type:
type WindowLike = TypedEventTarget<WindowEventMap>;

// Uses built-in EventTarget:
foo instanceof EventTarget // => true

// No intermediate classes:
Object.getPrototypeOf(Foo.prototype) === EventTarget.prototype // => true

// Exports helper types in case you need them:
import type { 
  TypedEventListener, 
  TypedEventListenerObject, 
  TypedEventListenerOrEventListenerObject
} from "@worker-tools/typed-event-target"
```

***
{:style="margin: 2rem 0"}

Links:
[__GitHub__](https://github.com/worker-tools/typed-event-target)
| [ghuc.cc](https://ghuc.cc/worker-tools/typed-event-target/index.ts)
· [__NPM__](https://www.npmjs.com/package/@worker-tools/typed-event-target) 
| [Browse Package](https://unpkg.com/browse/@worker-tools/typed-event-target/)
· [__deno.land__](https://deno.land/x/typed_event_target)
| [Docs](https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/typed-event-target/master/index.ts)
{:.faded}
<br/>