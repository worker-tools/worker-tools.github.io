#!/usr/bin/env -S deno run -A

import { dedent } from 'https://cdn.skypack.dev/ts-dedent'

import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts"
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export function getTitleDescription(markdown: string) {
  const markup = Marked.parse(markdown).content;
  const document = new DOMParser().parseFromString(markup, 'text/html')
  const title = document?.documentElement?.querySelector('h1')?.textContent
  const description = document?.documentElement?.querySelector('p')?.textContent?.replace(/\s+/g, ' ');
  return [title?.trim(), description?.trim()]
}

const nl = '\n\n'

for await (const dir of Deno.readDir('../packages')) {
  if (dir.isDirectory && !dir.name.startsWith('.')) {
    const README = (await Deno.readTextFile(`../packages/${dir.name}/README.md`).catch(() => '')).trim()
    if (!README) continue;
    const [, description] = getTitleDescription(README)

    const [heading, sub, ...lines] = README
      .replaceAll(/https?:\/\/github.com\/worker-tools\/?/g, '../')
      .split(nl)

    const denoName = ['router', 'middleware', 'html'].includes(dir.name) 
      ? `workers_${dir.name.replaceAll('-', '_')}`
      : dir.name.startsWith('deno-')
        ? dir.name.replace('deno-', '').replaceAll('-', '_')
        : dir.name.replaceAll('-', '_')
    const indexTS = dir.name.startsWith('deno-') ? 'mod.ts' : 'index.ts'

    const links = {
      github: `https://github.com/worker-tools/${dir.name}`,
      ghuc: `https://ghuc.cc/worker-tools/${dir.name}/${indexTS}`,
      npm: `https://www.npmjs.com/package/@worker-tools/${dir.name}`,
      unpkg: `https://unpkg.com/browse/@worker-tools/${dir.name}/`,
      deno: `https://deno.land/x/${denoName}`,
      docs: `https://doc.deno.land/https://raw.githubusercontent.com/worker-tools/${dir.name}/master/${indexTS}`,
      // docs: `https://doc.deno.land/https://deno.land/x/${denoName}/${indexTS}`,
    }

    const frontMatter = dedent`
      ---
      # THIS FILE WAS COPIED FROM worker-tools/${dir.name}/README.md! DO NOT MODIFY DIRECTLY!
      layout: page
      description: >
        ${description}
      ---
    `.trim()


    const toc = dedent`
      <noscript></noscript>
      * Table of Contents
      {:toc .large-only}
    `;

    const footer = dedent`
      ***
      {:style="margin: 2rem 0"}

      Links:
      [__GitHub__](${links.github})
      / [ghuc.cc](${links.ghuc})
      · [__NPM__](${links.npm}) 
      / [Browse Package](${links.unpkg})
      · [__deno.land__](${links.deno})
      / [Docs](${links.docs})
      {:.faded}
      <br/>
    `;

    const newREADME = frontMatter + nl + ([heading, sub, toc, ...lines, footer].join(nl))

    await Deno.writeTextFile(`./_tools/${dir.name}.md`, newREADME)
  }
}

// workers_router
// workers_middleware
// workers_html