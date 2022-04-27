---
# THIS FILE WAS COPIED FROM worker-tools/encrypted-cookie-store/README.md! DO NOT MODIFY DIRECTLY!
layout: page
description: >
  A partial implementation of the Cookie Store API that transparently encrypts and decrypts cookies via AES-GCM.
links:
  github: https://github.com/worker-tools/encrypted-cookie-store
  ghuc: https://ghuc.cc/worker-tools/encrypted-cookie-store/index.ts
  npm: https://www.npmjs.com/package/@worker-tools/encrypted-cookie-store
  unpkg: https://unpkg.com/browse/@worker-tools/encrypted-cookie-store/
  deno: https://deno.land/x/encrypted_cookie_store
  docs: https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/encrypted-cookie-store/master/index.ts
  # docs: https://doc.deno.land/https://deno.land/x/encrypted_cookie_store/index.ts
---

# Encrypted Cookie Store
A partial implementation of the [Cookie Store API](https://wicg.github.io/cookie-store)
that transparently encrypts and decrypts cookies via __AES-GCM__.

This is likely only useful in server-side implementations, 
but written in a platform-agnostic way.

<noscript></noscript>
* Table of Contents
{:toc .large-only}

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