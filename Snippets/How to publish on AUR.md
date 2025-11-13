---
tags:
  - arch
  - aur
  - publish
  - package
---

[Gist](https://gist.github.com/karesztrk/2402c1490947c728a53b00792b9dfd5f)

```sh
# Calculate new checksum
updpkgsums
# Update metadata
makepkg --printsrcinfo > .SRCINFO
# Commit / new change
jj commit -m "..."
# Push
jj git push -b master
```
