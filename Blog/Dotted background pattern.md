---
tags:
  - css
  - design
  - pattern
  - ux
date: 2023-11-05
---
On this blog, you might have noticed a special dotted pattern I use to emphasize headings. This design adds a unique touch, but it does present some CSS implementation challenges.
## Solutions
I've come up with two creative ideas, both relying on repeating gradients.
### Repeating conic-gradient
This approach involves a 3/4 spin with a transparent color, followed by a single 1/4 spin with the dot color. 
*Problem*: The only limitation is that the distance between the dots can't exceed the size of the dots themselves.
```css
  background: conic-gradient(
	from 0deg,
	var(--color-background) 0% 75%,
	var(--color-title) 0%
  );
  background-size: 1rem 1rem;
  background-repeat: round;
```

### Repeating linear-gradient
Here, two overlapping linear gradients are used to stack on top of each other. This effectively masks out only the dots themselves. 
*Problem*: The only challenge is to carefully manage the overall height to avoid dot overflow.
```css
  background: repeating-linear-gradient(
	  90deg,
	  transparent 0,
	  transparent var(--_dot-size),
	  var(--color-background) var(--_edge-end),
	  var(--color-background) var(--_gardient-end)
	),
	repeating-linear-gradient(
	  180deg,
	  var(--color-title) 0,
	  var(--color-title) var(--_dot-size),
	  transparent var(--_edge-end),
	  transparent var(--_gardient-end)
	),
	var(--color-background);
```