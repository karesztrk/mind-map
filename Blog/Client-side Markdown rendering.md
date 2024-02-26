---
tags:
  - markdown
  - csr
date: 2024-02-26
---
️️Markdown is flourishing these days. Web applications render it to HTML to display content. Traditionally, these documents are rendered to HTML on the server-side. But it doesn't have to be like that. If you are interested in a client-side solution, then this post is exactly for you.

Lately, I haven't been posting anything interesting. This is mainly because I've been fully immersed in writing end-to-end tests, which can be rather monotonous, but I'm steadily improving my skills. Additionally, I've been occupied with developing a full Rust-based TUI application. Balancing these tasks, I also prioritize spending time with my family. It's important to be present for the ones you care about👨‍🍼. Moreover, I've been exploring a fascinating, lightweight library called md4w. It's a Markdown rendering engine that has compatibility with virtually every JavaScript environment.

Several factors have made this library attractive to me:
- Small size and fast.
- Client-side rendering and universality.
- Written in Zig.

This made it a great candidate for use on my [Mind-map page](https://karolytorok.netlify.app/mind-map/). Currently, I have to perform server-side rendering to display the collection entries stored in Markdown. However, I find it inefficient to request the server to render these small information packets. Granted, holding my data on the server is more secure. Nevertheless, since this data is publicly accessible to anyone, I see no harm in rendering it client-side for improved efficiency.
## Install
From an installation standpoint, there's nothing particularly unique. You can simply download a release from [GitHub](https://github.com/ije/md4w) , install it via [npm](https://www.npmjs.com/package/md4w) or you can download it from a CDN, like [esm.sh](https://esm.sh/).
## Usage
The usage differs only in one step: you need to wait for the WebAssembly (Wasm) binary to be downloaded by the script.
```js
// Use the CDN url (Deno, Browsers)
import { init, mdToHtml  } from "https://esm.sh/md4w";

// waiting for md4w.wasm...
await init();

// markdown -> HTML. Voila
const html = mdToHtml("I used to be an _adventurer_ like you. Then I took an *arrow* in the knee...");
```
## Reference
- https://github.com/ije/md4w