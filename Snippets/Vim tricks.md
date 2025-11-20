---
tags:
  - vim
  - snippet
  - oneliner
  - utility
  - command
---
# Tricks

Replace all matches in the quick-fix list

```vim
:cfdo %s/test.describe/test.skip/ge | update
```

## Count the words

```vim
:%s/\w\+/\=submatch(0)+1/g | echo line('$')a
```

## Delete all white-spaces

```vim
:g/^\s*$/d
```

## Open multiple files in split mode

```vim
:argedit file1.txt file2.txt | all
```

Sum of al numbers present in a file

```vim
:put =eval(join(getline(1 '$'), '+'))
```

## Global commands (:g)

## Delete lines containing a word

```vim
:g/word/d
```

## Delete lines not containing a word

```vim
:g!/word/d
```

## Subsitute

```vim
:g/word/s/from/to
```

## Execute a command

For example, append a `// Comment` at the end of every line containing a `word`.

```vim
:g/word/normal A // Comment
```

## Exit

Save /w exit

```vim
ZZ
```

Save /wo exit

```vim
ZQ
```

## Format JSON

Make a selection and format the text with an external command (`jq`)

```vim
:'<,'>!jq
```

## Scrolling

The hotkeys for this are `C-Y` & `C-E`

Scroll the current line to the bottom.

```vim
zb
```

Scroll the current line to the top.

```vim
zt
```

## Visual mode navigation

Jump to the other end of the visual selection

```vim
o
```

