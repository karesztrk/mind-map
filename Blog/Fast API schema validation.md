---
tags:
  - schema
  - validation
  - json
  - valibot
date: 2024-03-07
---
️️Over the weekend, I worked on a side-project that required ultra-rapid completion while maintaining a focus on proper UX, logic, and testing. Naturally, the application needed to consume an external API. Given these constraints, I decided to utilize [Valibot](https://github.com/fabian-hiller/valibot) to validate the API schema and expedite the development process as much as possible.
## Introduction
[Valibot](https://github.com/fabian-hiller/valibot) presents itself as a modular, super slim library for validating structural data. This resonated with me, although I have no issue with the (de-facto) [Zod](https://github.com/colinhacks/zod) library, which is likely capable of performing the same tasks. I simply enjoy tinkering with new tools and technologies. The source code for the entire project can be viewed on GitHub.
## Getting started
I found the documentation and guides themselves to be less intuitive. As a newbie, I struggled to understand which method or approach to use for my small, general use case: validating the API response. It took me at least half an hour to figure out, but eventually, I was able to prototype quickly.

Here are the steps I followed:

1. Define a schema for validation.
2. (Optional) Infer the TypeScript type.
3. Parse the API response.
4. Handle ValiError
```ts
import { number, object, string, type Output, parse } from "valibot";

// Schema definition
export const UserSchema = object({
  id: number(),
  name: string(),
  created: number(),
  karma: number(),
  about: string(),
})

// Inferde type
export type User = Output<typeof UserSchema>;
// ...
// 'parse' or 'parseAsync'
const user = parse(UserSchema, response);
// ... handle error
```
## The good parts
What I found compelling, besides the extensive array of schema functions, is that Valibot is also capable of handling promises. It was seamless to integrate it with my [favorite fetch library](https://github.com/elbywan/wretch).
```ts
import { parseAsync } from "valibot";
import wretch from "wretch";

// ...
const response = wretch(api).url(path).get().json<UserSchema>(); // Promise
const result = parseAsync(UserSchema, response); // Promise
```
In addition to that, Its also possible to add internationalization to error messages. The currently supported languages can be found [here](https://github.com/fabian-hiller/valibot/tree/main/packages/i18n).
## The bad parts
I encountered difficulties in finding the appropriate schema functions for handling empty data. This challenge stemmed from not knowing which field was empty during the prototype phase. Instead, I received a generic error message such as 

> "Invalid type, required number but received undefined".

For a beginner like myself, it wasn't immediately apparent which field was problematic. As a result, I had to resort to brute force testing to determine the underlying cause.

While this wasn't a major issue, it's possible that I missed the part where I could add custom error messages. I noticed a similar concern raised in this GitHub issue: [Link to GitHub issue](https://github.com/fabian-hiller/valibot/issues/139).
## Conclusion
All in all, my experience with Valibot's developer experience (DX) was pleasant. I found it intuitive to work with, and despite encountering some challenges, I intend to continue using it in the future.
## Reference
- https://github.com/fabian-hiller/valibot
- https://github.com/karesztrk/genesys-news