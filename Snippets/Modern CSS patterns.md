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