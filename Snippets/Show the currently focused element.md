---
tags:
  - js
  - focus
---
```js
// Listen for focus changes on any element
document.addEventListener('focusin', (event) => {
  console.log('Currently focused element:', event.target);
  console.log('Tag name:', event.target.tagName);
  console.log('ID:', event.target.id);
  console.log('Class:', event.target.className);
});
```

