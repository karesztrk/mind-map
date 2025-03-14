---
tags:
  - standard
  - schema
  - esm
  - cjs
date: 2025-03-14
---
Today, I want to talk about following standards. Are you adhering to them, or are you going rogue and carving your own path?
## Background
Recently, I wanted to add runtime API validation to one of my "old" projects. So, I browsed the web, gathering all the information I could about these libraries.  
Initially, I thought it would be a piece of cake, but I soon realized it was an entire ecosystem—with a bunch of libraries out there.

## The trend
Usually, trends are not very important to me. This was no exception, but the number of [downloads](https://npmtrends.com/arktype-vs-effect-vs-typia-vs-valibot-vs-zod) for Zod is outrageous. I don’t really understand the love for Zod, as it is bloated and [slow](https://moltar.github.io/typescript-runtime-type-benchmarks/) compared to other libraries.

## Standard schema
This constraint was very interesting. Recently, a [new standard](https://github.com/standard-schema/standard-schema) has been emerging from the creators of Zod, Arktype, and Valibot.

> Their goal is to make it easier for ecosystem tools to accept user-defined type validators.

They bought me with this one. The number of libraries available makes it essential to have a good technique for switching from one to another if needed.

## ESM
As I was experimenting with my project by creating various Proof of Concepts, I realized something: most of them either prioritize ESM support or are ESM-only. This is yet another step toward modern application development! Since my app was using CommonJS, I saw this as the perfect opportunity to modernize.

Luckily, the transition was fairly easy, and I was able to complete it in a single day. I found this [Gist](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) by [sindresorhus](https://gist.github.com/sindresorhus) incredibly helpful.

I was so proud to finish this. It opens up cool new opportunities for my project.

## Results
Here are my findings, in no particular order. There are many more libraries out there, but these stood out to me.


| **Libray**                                                                                     | [**react-hook-form**](https://react-hook-form.com/ "https://react-hook-form.com/") **support** | [**standard-schema**](https://github.com/standard-schema/standard-schema "https://github.com/standard-schema/standard-schema") **support** | **Infer type** | **Infer schema** | **Compiled** | **Bundle size** | **JSON string validator** | **ESM first** |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ---------------- | ------------ | --------------- | ------------------------- | ------------- |
| [Arktype](https://github.com/arktypeio/arktype "https://github.com/arktypeio/arktype")         | ✅                                                                                              | ✅                                                                                                                                          | ✅              | ❌                | ❌            | ✅               | ✅                         | ✅             |
| [Valibot](https://github.com/fabian-hiller/valibot "https://github.com/fabian-hiller/valibot") | ✅                                                                                              | ✅                                                                                                                                          | ✅              | ❌                | ❌            | ✅               | ❌                         | ❌             |
| [Zod](https://github.com/colinhacks/zod "https://github.com/colinhacks/zod")                   | ✅                                                                                              | ✅                                                                                                                                          | ✅              | ✅ (plugin)       | ❌            | ❌               | ✅                         | ❌             |
| [Typia](https://github.com/samchon/typia "https://github.com/samchon/typia")                   | ❌                                                                                              | ❌                                                                                                                                          | ✅ (type only)  | ✅                | ✅            | ✅               | ❌                         | ❌             |
| [Effect](https://effect.website/ "https://effect.website/")                                    | ✅                                                                                              | ✅                                                                                                                                          | ✅              | ❌                | ❌            | ❌               | ❌                         | ❌             |


### Personal notes
- **Arktype** - Fast, larger then Valibot. Bunch of validators.
- **Valibot** - I used and have good experience, slower then Arktype.
- **Zod** - Bloated and slow. It has by far the largest community.
- **Typia** - Blazing fast but it's harder to configure. No need for schemas. It's unique.
- **Effect** - Very good support but bloated. Overkill if only goal is validation.

## Conclusion
None of the libraries have my vote yet, but I'm curious about your opinion. Do you have experience with any of these libraries? Do you know their advantages or disadvantages? Please let me know.
## References
- https://dev.to/dzakh/javascript-schema-library-from-the-future-5420
- https://npmtrends.com/arktype-vs-effect-vs-typia-vs-valibot-vs-zod
- https://moltar.github.io/typescript-runtime-type-benchmarks/






 