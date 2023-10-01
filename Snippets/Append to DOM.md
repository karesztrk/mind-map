---
tags:
  - html
  - javascript
  - js
  - append
  - dom
  - fragment
---
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic List</title>
  </head>
  <body>
    <ul id="myList"></ul>

    <script>
      let items = [...Array(1000).keys()].map((i) => `Item ${i}`);

      let ul = document.getElementById("myList");
      let fragment = document.createDocumentFragment();

      for (let item of items) {
        let li = document.createElement("li");
        li.textContent = item;
        fragment.appendChild(li);
      }

      ul.appendChild(fragment);
    </script>
  </body>
</html>
```