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

### Scroll container
```css
@mixin scroll-container {
	contain: size; /* The element and its contents independent from the rest of the document tree. */
	overflow-y: auto; /* Show vertical scrollbar */
	overscroll-behavior-x: contain; /* block parent horizontal scrolbar */
}
```