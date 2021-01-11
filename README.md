# @werker

<picture class="app-button" style="display:block;text-align:center">
  <img src="assets/img/werker.png" alt="Logo" style="height:10rem;width:10rem; margin:5rem 0">
</picture>

Tools for writing HTTP servers in [Worker Environments][1] such as Cloudflare Workers.
{:.lead.centered style="max-width:560px;margin-left:auto;margin-right:auto"}

[1]: https://workers.js.org/

[Foo](#foo){:.btn.btn-primary}
[Bar](#bar){:.btn.btn-default style="font-weight:normal"}
{:.centered.mt2.mb4}

***

* Table of Contents
{:toc .large-only}

Worker Utils ([**@werker**][2]) are a collection of composable libraries for building web server in [Worker Environments][1] such as Cloudflare Workers. 
Most also work in Service Workers for code sharing between client and server.

<!-- The goal is to build an entire web framework, similar to express.js. -->

[2]: https://www.npmjs.com/org/werker

## HTML Templating

## Cookies

## KV Storage

## Response Creators

## Router

## Sessions

## Content Negotiation

## CORS

## Authorization

<br/>

<style>
.page > p { position: relative }
.page > header > h1 + .hr { 
  display: none; 
}

.mt6 { margin-top: 6rem }
.mb2 { margin-bottom: 1.5rem }

h1, h2, h3, .h1, .h2, .h3 { margin-top: 4rem }
h4, h5, h6, .h4, .h5, .h6 { margin-top: 3rem }
.page > hr { margin: 4rem 0 }

clap-button {
  --clap-button-color: var(--accent-color);
}

h2 + p > clap-button[url^="#"] {
  margin: 0;
  width: 3rem;
  height: 3rem;
  position: absolute;
  left: -6rem;
  margin-top: -3rem;
  font-size: smaller;
  color: var(--gray-text);
  --clap-button-color: var(--menu-text);
}

.page > header > h1 { 
  width: 100%!important;
  font-size: 4rem;
  text-align: center;
  width: 100%!important;
}

.larger { font-size: larger; }
.smaller { font-size: smaller; }

.layout-welcome { padding-top: 4rem; }
#_navbar { transform: translateY(-5rem); }

#legend + dl {
  display: grid;
  grid-template-columns: repeat(auto-fill, 36px minmax(min(300px, 100%), 1fr));
  grid-gap: 0.5rem;
}
#legend + dl dd {
  margin: 0;
}

/* .btn-primary { color: #333; }
.btn-primary:hover { color: #333; } */

table.stretch-table { margin: 2rem -1rem!important; width:calc(100% + 2rem)!important; }
</style>
<script>window.dispatchEvent(new HashChangeEvent('hashchange', { newURL: new URL('#noop', location).href }))</script>