---
tags:
  - html
  - css
  - svg
date: 2023-11-12
---
Using icons on a website is a common and integral task, often incorporated into paragraphs, snippets, illustrations, and more. SVGs are frequently chosen for this purpose due to their scalability advantages.

Several methods exist for using SVGs on a website:

- Inline SVG
- Embedding it within an `img` tag
- Loading it with CSS (`background`, `content`, etc.)

However, challenges arise when attempting to style SVGs with CSS.
## Inline SVG
When you add an SVG directly into HTML, you have full control over styling. Each tag within the SVG can be individually styled as needed.
```html
<body>
  <svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> 
</body>
```
## `img` tag
Using an SVG as the source of an image relinquishes rendering control to the browser. While you can change colors using CSS `filter` solutions, achieving specific colors may prove challenging.
```html
<img src="logo.svg" alt="Site logo">
```
## CSS loading
SVGs can be loaded through CSS as regular assets, similar to JPEG, PNG, or WEBP images. Styling remains similar to other methods, but control is relinquished.

```css
.main-header {
  background: url(logo.svg) no-repeat;
  background-size: contain;
}
```

## My solution
I've devised a solution based on the traditional "sprite" technique, without the need for a large image file. However, it requires keeping track of images and assigning unique IDs.

- Create an inline SVG element to hold your logo.
- Place the logo image in the public or assets folder.
- Import the image path.
- Append the unique ID followed by "#"
```html
<svg>
  <use href="/public/logo.svg#id">
</svg>
```
This approach combines the best of both worlds:

- The image is loaded by the browser as an image, making caching possible.
- An inline SVG tag allows for flexible styling with CSS.

The downside is the need to distribute IDs, a manageable task with tools like `svgo-loader`.

```json
{
    loader: 'svgo-loader',
    options: {
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        removeViewBox: false,
                        cleanupIds: false,
                    },
                },
            },
            {
                name: 'addClassesToSVGElement',
                params: {
                    className: 'cxn-icon',
                },
            },
            {
                name: 'addAttributesToSVGElement',
                params: {
                    attributes: [
                        {
                            id: path.parse(resource).name,
                        },
                    ],
                },
            },
        ],
    },
}

```

## Component
### React
```tsx
import React, { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';
import { getFileName } from './IconComponent.util';

interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
    src: string;
    reference?: string;
    inline?: boolean;
    title?: string;
}

const baseClass = 'icon';

const IconComponent: FC<IconComponentProps> = ({
    src,
    reference,
    className,
    viewBox = '0 0 24 24',
    width = '1em',
    height = '1em',
    inline,
    title,
    role,
    ...rest
}) => {
    const href = `${src}#${reference || getFileName(src)}`;
    const clsName = clsx(baseClass, inline && `${baseClass}-inline`, className);
    return (
        <svg className={clsName} viewBox={viewBox} width={width} height={height} role={role} {...rest}>
            {title && <title>{title}</title>}
            <use href={href} />
        </svg>
    );
};

export default IconComponent;
```
### Astro
```astro
---
import type { HTMLAttributes } from "astro/types";
import { getFileName } from "./Icon.util";

interface Props extends HTMLAttributes<"svg"> {
  src: string;
  reference?: string;
  inline?: boolean;
  title?: string;
}

const baseClass = "icon";
const {
  viewBox = "0 0 24 24",
  width = "1em",
  height = "1em",
  class: className,
  role,
  title,
  src,
  reference,
  inline,
  ...rest
} = Astro.props;

const href = `${src}#${reference || getFileName(src)}`;
---

<svg
  class:list={[baseClass, { [`${baseClass}-inline`]: inline }, className]}
  viewBox={viewBox}
  width={width}
  height={height}
  role={role}
  {...rest}
>
  {title && <title>{title}</title>}
  <use href={href}></use>
</svg>

```

## Reference
https://kurtextrem.de/posts/svg-in-js