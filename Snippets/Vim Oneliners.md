---
tags:
  - vim
  - snippet
  - oneliner
  - utility
  - command
---

Replace all matches in the Quickfix list

```
:cfdo %s/test.describe/test.skip/ge | update
```

# Count the words

```
:%s/\w\+/\=submatch(0)+1/g | echo line('$')a
```

# Count the words

```
:g/^\s*$/d
```

# Open multiple files in split mode

```
:argedit file1.txt file2.txt | all
```

Sum of al numbers present in a file

```
:put =eval(join(getline(1 '$'), '+'))
```

