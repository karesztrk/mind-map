---
tags:
  - design
  - dashed
  - stroke
  - svg
date: 2026-02-17
---

So, you want to draw a perfectly even dashed border around your HTML element? At first glance, it looks like a no-brainer. However, I soon realized there are nuances.

This is the design: we want a pixel-perfect, evenly distributed dashed border around an image.

![A space invader alien within a dashed rectangle](./Images/dashed_border_image.webp "Design image with dashed border")

## Basic solution

Okay, you say. Let's slap on some CSS `border-style` on it. Right? Well, check what happens when i do.

<figure>
    <div class="canvas" style="margin: 0 auto; background: #fff; inline-size: 320px;">
        <div style="margin: 10px;padding: 10px; inline-size: 300px; block-size: 300px;
        border: 3px dashed #C510B9; display: grid; place-items: center;
        border-radius: 16px; color: #000;">300x300</div>
    </div>
    <figcaption>The CSS-only version. The dashes are ugly near the corners</figcaption>
</figure>

Check the dashes around the corners. They are congested.
Drawing dashes evenly works much nicer when using an SVG instead. Check the following example.

<figure> <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" class="canvas" style="background: #fff"
    fill="none"><patth fill="#fff" d="M0 0h320v320H0z"/><rect width="297"
        height="297" x="11.5" y="11.5" fill="#FBFAF9" stroke="#C510B9"
        stroke-dasharray="8 6" stroke-width="3" rx="14.5"/><text x="125"
        y="160" fill="#000">300x300</text> /></svg>
    <figcaption>SVG version. Check the even dashes near the corners</figcaption>
</figure>

Much better, isn't it? We are using an almost full-sized `<rect>` with some `stroke-dasharray` pattern. And look at that, it already prettier.

## Further improvements

So there are more things that bothers me:

- If the stroke is very narrow then it's barely visible.
- We had to scale down the `<rect>`

### Overflow

Why is that? Well, in SVG, strokes are naturally centered on the shape’s path. Anything that overflows is hidden because of how HTML works: images generally don’t spill beyond their bounds.

There are clever techniques that rely on [techniques that rely on `<clip-path>` or `<mask>` while shrinking the original object](https://www.tutorialpedia.org/blog/stroke-svg-path-only-inside-or-only-outside/), but I found the most elegant solution from [Josh Comeau](https://www.joshwcomeau.com/): `overflow: visible` ✨. We allow the [spillover](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow#visible): overflow: visible ✨. We simply allow the spillover.

### Scaling

Perfect, but we can make it even better.

By default, when we scale (stretch or squish) an SVG, the strokes are affected by vector transformations. We can opt out if we use `preserveAspectRatio` on the SVG itself, but what if that’s not an option?

We can use a 'hidden' SVG feature called `vector-effect: non-scaling-stroke`. [Rich Harris](https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp) has a great article on applying this to data visualization. With this property, the stroke width remains independent of the transformation. It also affects the dash pattern, making it render even more cleanly. The browser calculates the stroke width based on the screen pixels rather than the internal SVG coordinate system

To be honest, it’s an optional property that depends on the final design requirements. Check out the following example and experiment with different sizes or zoom levels!

<style>
#non-scaling-stroke-input:checked ~ div > svg > rect {
    vector-effect: non-scaling-stroke;
}
</style>

<figure>
  <input id="non-scaling-stroke-input" type="checkbox" />
  <label for="non-scaling-stroke-input">Non-scaling stroke</label>
  <div class="canvas"
    style="
      --gutter: 20px;
      --size: 300px;
      display: grid;
      place-items: center;
      inline-size: calc(var(--size) + var(--gutter));
      block-size: auto;
      aspect-ratio: 1;
      background: #fff;
      margin: 0 auto;
      resize: both;
      overflow: auto;
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style="
        background: #fff;
        overflow: visible;
        border-radius: 16px;
        inline-size: calc(100% - var(--gutter));
        block-size: auto;
        aspect-ratio: 1;
      "
      viewBox="0 0 200 200"
    >
      <path
        d="M121.586 83.116v15.39h15.391v-15.39h-15.391Zm-61.562 0v15.39h15.39v-15.39h-15.39Zm0 61.563h30.78v15.39h-30.78v-15.39Zm76.953 0v15.39h-30.782v-15.39h30.782Zm0-92.344v-15.39h15.39v15.39h-15.39Zm-76.953 0h15.39v15.39h46.172v-15.39h15.391v15.39h15.39v15.391h15.391v15.39h15.391v46.173h-15.391v-30.782h-15.391v30.782h-15.39v-15.391H60.024v15.391H44.633v-30.782h-15.39v30.782H13.851V98.507h15.39V83.116h15.391v-15.39h15.39V52.334Zm-15.391-15.39h15.39v15.39h-15.39v-15.39Z"
        style="fill: #c510b9"
      />
      <rect
        width="100%"
        height="100%"
        rx="14.5"
        style="stroke-dasharray: 8 6; stroke: #c510b9; stroke-width: 3px"
      />
    </svg>
  </div>
  <figcaption>Final solution. Resize the element to scale</figcaption>
</figure>
