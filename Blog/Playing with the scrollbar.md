---
tags:
  - scroll
  - animation
date: 2024-10-31
features: 
  - scroll-driven-animations
---
I recently discovered a new toy called scroll-driven animations. Since it’s a fresh feature currently only available in Chrome, I thought it would be the perfect time to dive into something new in modern CSS. I’d heard about it several times in [newsletters](https://codepen.io/spark) and [podcasts](https://thecsspodcast.libsyn.com/090-scroll-driven-animations), but until now, I didn’t find it particularly appealing. Turns out, I was so wrong… so let’s dive in!

## Rules

Scroll-driven animations, like regular CSS animations, enable you to play animations—but only when certain scroll conditions are met. Unlike regular animations, which start immediately as soon as the CSS rule is applied, scroll-driven animations use a different trigger mechanism.

In my opinion, `animation-timeline` is the key to understanding how it works. This CSS property lets you control the animation’s progress. You can link the animation to the visibility of the current element using `view()` or to a completely different element in the DOM with `--timeline-name`.

```css
.item {
  /* ...*/
  animation-timeline: view(); /* Set the timeline to the element's closest scrollbar axis along its visible! */
  /* animation-timeline: scroll();  if we want to track the whole scroll area */
}
```

Another very useful property is `animation-range`, which specifies when the animation should start and end relative to the timeline. You can find a great debugger [here](https://scroll-driven-animations.style/tools/view-timeline/ranges/) that helps you understand timeline ranges more clearly.

```css
.item {
  /* ...*/
  animation-range: entry 5% cover 40%; /* Start when 5% of the element's scroll port is reached and stop when 40% of the element's visiblity is reached
}
```

Want to animate your target based on a different part of the DOM? No problem—you can specify a custom scroll container for the animated element. For example, this allows you to create a GPU-accelerated horizontal scroll progress indicator.

```css
 html {
   scroll-timeline: --page-scroll block;
}
.progress {
   animation: grow-progress auto linear;
   animation-timeline: --page-scroll;
}
```

## Caveats

There are a few caveats when enabling scroll-driven animations. The first is browser support—at the time of writing, it’s only available in Chrome. Because of this, it’s strongly recommended to use progressive enhancement with the `@supports` rule.

The second is the declaration order of the `animation-timeline`.

> You need to declare `animation-timeline` after declaring any `animation` shorthand for it to take effect. Because currently the `animation` resets a previously-declared `animation-timeline`.

## Examples
Over the past few days, I’ve created several examples, which you can check out on [CodePen](https://codepen.io/collection/ZMgdmv). Alternatively, explore my site to see them in action ✨.

Now it’s your turn to get creative 💅

## Reference
- https://thecsspodcast.libsyn.com/090-scroll-driven-animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- https://codepen.io/collection/ZMgdmv
- https://scroll-driven-animations.style/
- https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/
- https://scroll-driven-animations.style/tools/view-timeline/ranges/