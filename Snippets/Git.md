---
tags:
  - snippet
  - utility
  - command
  - git
---
# Blame

Triple `-C` helps in scenarios where significant portions of a codebase have been moved around multiple times, potentially across multiple files over an extended period. It ensures that you can trace back to the initial commits affecting the current state of any line of code.

```sh
git blame -C -C -C file_name
```

# Undo file changes

```sh
# find a hash for a commit before the file was changed
git log
# use the arrow keys to scroll up and down in history
# once you've found your commit, save the hash
git checkout [saved hash] -- path/to/file
# the old version of the file will be in your index
git commit -m "Wow, you don't have to copy-paste to undo"
```

