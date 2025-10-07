---
tags:
  - css
---
## Wrapper
```css
.wrapper-old {
	padding: 0 2rem;
	max-width: 1160px;
	margin-inline: auto;
}

.wrapper-new {
	--_content-max-width: 1160px;
	--_padding-inline: 2rem;
	width: min(var(--_content-max-width), 100% - calc(var(--_padding-inline) * 2));
	margin-inline: auto;
}
```

## Flow

```css
.flow > * + * {
	margin-top: 1em;
}
```

## Fluid grid
```css
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 50px), 1fr));
}
```

## Flex text wrapping

```css
.flex-group {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

.flex-group > * {
	min-width: fit-content;
	flex: 1;
}
```

## Scroll container
```css
@mixin scroll-container {
	contain: size; /* The element and its contents independent from the rest of the document tree. */
	overflow-y: auto; /* Show vertical scrollbar */
	overscroll-behavior-x: contain; /* block parent horizontal scrolbar */
}
```

## Transition animation for `<dialog>` and `[popover]`
```css
/* enable transitions, allow-discrete, define timing */
[popover], dialog, ::backdrop {
  transition: display 1s allow-discrete, overlay 1s allow-discrete, opacity 1s;
  opacity: 0;
}

/* ON STAGE */
:popover-open,
:popover-open::backdrop,
[open],
[open]::backdrop {
  opacity: 1;
}

/* OFF STAGE */
/* starting-style for pre-positioning (enter stage from here) */
@starting-style {
  :popover-open,
  :popover-open::backdrop,
  [open],
  [open]::backdrop {
    opacity: 0;
  }
}
```

## Grid for list

```css
ul {
  inline-size: min(100%, 500px);
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  padding: 0;

  li {
    /* Careful with this: it removes the content from the a11y tree */
    display: contents;

    @supports (grid-template-columns: subgrid) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: subgrid;
    }
  }
}

```

## Centering
### Absolute

```css
.outer-box {
  position: relative;
}
/* Transform trick */
.inner-box-transform {
  position: absolute;
  left: 50%;
  top: 50;
  transform: -50% -50%;
}

/* Using margin */
.inner-box-margin {
  position: absolute;
  inset: 0;
  margin: auto;
}
```

### Flex
```css
.outer-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-box {
  /* margin: auto; */
}
```

### Grid
```css
.outer-box {
  display: flex;
  place-items: center;
}
.inner-box {
  /* place-self: center; */
  /* margin: auto; */
}
```

### w/o display
```css
.outer-box {
  align-content: center;
  justify-items: center;
}
.inner-box {
  /* margin: auto; */
}
```

## Number input
### Remove arrows

```html
<input type="number" inputmode="numeric">
```

```css
/* Chromium & Safari */
input[type=number]::-webkit-inner-spin-button {
  display: none;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
```
### w/o CSS

```html
<input type="text" inputmode="numeric" pattern="[0-9]+">
```

### Modal backdrop scrolling

```css
/**
 * Prevent background scrolling with a modal dialog is open
 */
html:has(dialog[open]:modal) {
	overflow: hidden;
}
/**
 * Hold space for scrollbar to prevent jumping on pages.
 */
html {
	scrollbar-gutter: stable;
}
```