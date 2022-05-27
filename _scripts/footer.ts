#!/usr/bin/env -S deno run -A

const footer = await Deno.readTextFile(new URL('./footer.md', import.meta.url))

for await (const dir of Deno.readDir('../packages')) {
  if (dir.isDirectory && !dir.name.startsWith('.')) {
    const README = (await Deno.readTextFile(`../packages/${dir.name}/README.md`).catch(() => '')).trim()
    if (!README) continue;
    if (dir.name === 'shed' || dir.name.match(/wasm/)) continue;
    const newREADME = README
      .replace(/\n+<br\>\n+--------(.+)$/s, '\n' + footer) // replace the footer
      // .replace(/\n+--------(?:.(?!--------))+$/s, '\n' + footer) // replace the footer
    await Deno.writeTextFile(`../packages/${dir.name}/README.md`, newREADME)
  }
}