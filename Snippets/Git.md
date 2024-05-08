---
tags:
  - snippet
  - utility
  - command
  - git
---
Triple `-C` helps in scenarios where significant portions of a codebase have been moved around multiple times, potentially across multiple files over an extended period. It ensures that you can trace back to the initial commits affecting the current state of any line of code.

```
git blame -C -C -C file_name
```
