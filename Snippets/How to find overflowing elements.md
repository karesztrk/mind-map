---
tags:
  - javascript
  - js
  - overflow
  - css
  - trick
---
```
document.querySelectorAll("*").forEach(el => {
  if(el.offsetWidth > document.documentElement.offsetWidth) {
    console.log(el);
  }
})
```

