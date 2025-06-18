---
tags:
  - vcs
  - git
date: 2025-06-19
---
️️This post is about a topic that every developer struggles with. Version control systems (VCS for short) are an essential part of our day-to-day life. When I say commit, branch, or conflict, you automatically associate it with Git—thanks to the Pavlovian reflex that is hard-coded into our brains these days. But it doesn't have to be. In this post, I invite the reader to explore a new VCS called Jujutsu (or `jj`) that can "replace" Git.

## Background

Back in the day, I started with [SVN](https://subversion.apache.org/), a VCS that I barely remember. But I do remember that there were “trunk” folders all over the place. Most of the mental model has faded.  
Then two new kids on the block emerged: [Mercurial](https://www.mercurial-scm.org/) and Git. You won't find out who the winner was. I never tried Mercurial, but I do remember that it was hard to understand how Git works. Heck, it hasn’t changed:

- Branching strategies
- Scary conflicts/rebases
- Tons of configuration values
- Nobody knows how `reflog` works

So I discovered [Jujutsu](https://jj-vcs.github.io/jj/latest/), a VCS that combines the goodies from each world. I've been using it for a few weeks now, and I like it.

JJ is a facade over different storage backends. At the time of writing, only the [Git backend](https://jj-vcs.github.io/jj/latest/glossary/#backend) is stable. That’s also the reason why almost every JJ commit contains the word “git.”  
Let’s see the basics.
## Concept

The first difference that the user notices is that—compared to Git—every change is _automatically staged_. You don't need to manually stage anything. The working copy keeps every modification.

The second is that there are _no branches_. You heard right—I know it sounds impossible 😅. But we have [bookmarks](https://jj-vcs.github.io/jj/latest/glossary/#bookmark) instead. A bookmark is a pointer to a commit (similar to Mercurial). You can have as many as you want, but you need to move them forward manually. Inside a co-located repository, every Git branch has its own bookmark, and vice versa. However, Jujutsu won't forward them—it's a manual user step.

The third—and maybe the biggest—shocking fact is that your conflicts can be put away. Jujutsu will let you know about conflicts, and you'll see a similarly obscure diff in your source files. The user can switch to another change and work there, then come back later to resolve. It's even possible to _commit a conflict_. For me, it's remarkable that JJ doesn’t block me (unlike Git) when a conflict is detected.
## Basics

```sh
jj git clone <url> # Clone a Git repo
jj st # the current status
jj log # version history
```

Notice that we are checking out a Git repository.
### Status

As mentioned above, there is no staging area in Jujutsu. The `status` command will print the high-level status: changes. A change always has an ID, a commit ID, and an optional description.  
Changes are automatically committed from the working copy. So if we change a file and run `jj st`, it will be auto-committed.

```sh
> jj st
The working copy has no changes.
#           [abbr]  [change] [commit]         [description]
Working copy  (@) : yzsokllu 3038376b (empty) (no description set)
Parent commit (@-): wzklvxkw 45a52ae2 master | May update
```
### History

I would like to emphasize how gorgeous and clean the version history output is—just compare it with `git log`.
```sh
> jj log
#  [change] [who]  [when]              [commit]
@  yzsokllu ktorok 2025-06-11 21:46:18 3038376b 
│  (empty) (no description set)
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master 45a52ae2
│  May update
~
```

`@` means the working copy, and `◆` is an immutable change (basically, you're not allowed to change it). `~` means that the commit has a parent, but it's not included. All of this is configurable.
### Commit

A commit or "revision" is a snapshot of the repository at a given time. But do not confuse it with a change. A change _wraps_ a commit and evolves over time. This means that the content, the commit ID, and the description can be modified for a single change. Executing JJ commands will implicitly modify the commit ID.

```sh
> echo "Hi JJ" > stuff.txt # the change
> jj describe -m "Greetings" # describing the change
# Notice that the commit id change but the change id did not
Working copy  (@) now at: yzsokllu f98bf85d Greetings
Parent commit (@-)      : wzklvxkw 45a52ae2 master | May update
```

We can continue working by executing the `new` command. This will instruct JJ to create a new anonymous "pocket" for our next changes. It will clean the working copy and seal our previous change (`yzsokllu`). The official docs encourage the user to always use the `new` command.

```sh
> jj new # let's work on something else
Working copy  (@) now at: mztkqtks a8fbde10 (empty) (no description set)
Parent commit (@-)      : yzsokllu f98bf85d Greetings
```

There is also a convenient shorthand command called `commit` (=`describe & new`). Although it's not essential, it helps the regular Git user to maintain the original mindset: produce "checkpoints" along the way by regularly committing the work.

[A demo of using `jj commit`](./Casts/jj-commit.cast)

### Push

Once the change or change set is ready, we can push it back to the remote. As mentioned, the user is not tied to branches. Pushing happens via bookmarks. JJ will execute several [safety checks](https://jj-vcs.github.io/jj/latest/bookmarks/#pushing-bookmarks-safety-checks) before pushing. The table below shows a high-level overview.

|                | Bookmark `feature`           | `feature@origin` branch | Push allowed |
| -------------- | ---------------------------- | ----------------------- | ------------ |
| Common state   | `abcdefgh` is an ancestor    | `abcdefgh` exists       | ✅            |
| Non-conflicted | `abcdefgh` is not conflicted | -                       | ✅            |
| Tracked        | Tracked                      | Exist                   | ✅            |


```sh
> jj git push -b `feature` # push tracked `feature` bookmark to the remote
```


Bookmarks can also be implicitly created during the push. Instead of the bookmark name, the user must specify the change ID.

```sh
> echo "I’m going to learn Jujitsu?" >> stuff.txt
> jj commit -m "Matrix quote" # seal the work & create a new
Working copy  (@) now at: vlwlkrwl eec715e8 (empty) (no description set)
Parent commit (@-)      : vvwrropu 86ab0198 Matrix quote
> jj git push -c @- # push the parent change (--change)
```

Now we understand that bookmarks are essential to work with the Git backend. Unlike Git, in JJ bookmarks have to be manually set by the user. Jujutsu will rarely move them automatically. Let’s demonstrate this with the following example.

```sh
> jj log # matrix bookmark is set on `vvwrropu`
@  vlwlkrwl ktorok 2025-06-15 14:21:00 eec715e8
│  (empty) (no description set)
○  vvwrropu ktorok 2025-06-15 14:21:00 matrix 86ab0198
│  Matrix quote
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
> echo "Wake up Neo" >> stuff.txt
> jj commit -m "Another quote"
Working copy  (@) now at: suvovuyq dbb85aad (empty) (no description set)
Parent commit (@-)      : vlwlkrwl 0309cb15 Another quote
> jj bookmark list # matrix bookmark is still on vvwrropu. frwd is needed
master: yzsokllu f98bf85d Greetings
  @origin (behind by 1 commits): wzklvxkw 45a52ae2 May update
matrix: vvwrropu 86ab0198 Matrix quote
> jj bookmark move --from 'heads(::@- & bookmarks())' --to @- # pull up the nearest bookmarks to the working-copy parent
# or simply: jj bookmark move matrix -t vl
```
### Fork

Let’s say that we need to jump back and forth between different features. Git has a couple of options for this:

- Spamming (and restoring from) [stashes](https://git-scm.com/docs/git-stash)
- [Worktree](https://git-scm.com/docs/git-worktree) switching (which has never really worked for me)
- Optionally committing "half-baked"/temporary changes

JJ has a much simpler way. Just specify from where you would like to start a `new` change. Simple, right?

```sh
> jj log # we are on `vlwlkrwl` but master is behind
@  vlwlkrwl ktorok 2025-06-17 14:38:43 matrix 3e09cfd6
│  Another quote
○  vvwrropu ktorok 2025-06-15 14:21:00 86ab0198
│  Matrix quote
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
> jj new master # a new change is needed from master
Working copy  (@) now at: kuskrksk cb60f0cc (empty) (no description set)
Parent commit (@-)      : yzsokllu f98bf85d master* | Greetings
Added 0 files, modified 1 files, removed 0 files
jj log # new change is `kuskrksk` and `vlwlkrwl` is intact
@  kuskrksk ktorok 2025-06-17 14:51:44 cb60f0cc
│  (empty) (no description set)
│ ○  vlwlkrwl ktorok 2025-06-17 14:38:43 matrix 3e09cfd6
│ │  Another quote
│ ○  vvwrropu ktorok 2025-06-15 14:21:00 86ab0198
├─╯  Matrix quote
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
```
### Merge

The simple merging strategy is similar in JJ and Git. However, instead of using the obscure [Git merge](https://git-scm.com/docs/git-merge), we can use what we are already comfortable with: `new`. Let’s continue the previous example.

```sh
> echo "I used to be an adventurer like you." > skyrim.txt
> jj commit -m "Skyrim"
Working copy  (@) now at: zvmmpxwm b76fac6b (empty) (no description set)
Parent commit (@-)      : kuskrksk b82309fe Skyrim
> jj new k vl # specify the revisions
> jj log # notice that `matrix` branch and `master` is merged
@    xnwylsus ktorok 2025-06-17 15:05:04 a338bc95
├─╮  (empty) (no description set)
│ ○  vlwlkrwl ktorok 2025-06-17 14:38:43 matrix 3e09cfd6
│ │  Another quote
│ ○  vvwrropu ktorok 2025-06-15 14:21:00 86ab0198
│ │  Matrix quote
○ │  kuskrksk ktorok 2025-06-17 15:03:17 b82309fe
├─╯  Skyrim
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
```

[Octopus merge](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt-octopus)? No problem.

```sh
> echo "These are not the droids you are looking for ..." > starwars.txt
> jj commit -m "Star Wars"
> jj log
@  yzzwzvut ktorok 2025-06-17 15:09:01 4e29b1ce
│  (empty) (no description set)
○  wrorrsyk ktorok 2025-06-17 15:09:01 a8e662b1
│  Star Wars
│ ○  kuskrksk ktorok 2025-06-17 15:03:17 b82309fe
├─╯  Skyrim
│ ○  vlwlkrwl ktorok 2025-06-17 14:38:43 matrix 3e09cfd6
│ │  Another quote
│ ○  vvwrropu ktorok 2025-06-15 14:21:00 86ab0198
├─╯  Matrix quote
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
> jj new wr k vl # start from 3 distinct changes
Working copy  (@) now at: kqppnxlq 5ad855eb (empty) (no description set)
Parent commit (@-)      : wrorrsyk a8e662b1 Star Wars
Parent commit (@-)      : kuskrksk b82309fe Skyrim
Parent commit (@-)      : vlwlkrwl 3e09cfd6 matrix | Another quote
Added 1 files, modified 1 files, removed 0 files
> jj log # @ contains all changes from the 3 branch
@      kqppnxlq ktorok 2025-06-17 15:09:17 5ad855eb
├─┬─╮  (empty) (no description set)
│ │ ○  vlwlkrwl ktorok 2025-06-17 14:38:43 matrix 3e09cfd6
│ │ │  Another quote
│ │ ○  vvwrropu ktorok 2025-06-15 14:21:00 86ab0198
│ │ │  Matrix quote
│ ○ │  kuskrksk ktorok 2025-06-17 15:03:17 b82309fe
│ ├─╯  Skyrim
○ │  wrorrsyk ktorok 2025-06-17 15:09:01 a8e662b1
├─╯  Star Wars
○  yzsokllu ktorok 2025-06-13 06:42:05 master* f98bf85d
│  Greetings
◆  wzklvxkw ktorok 2025-05-29 16:42:59 master@origin 45a52ae2
│  May update
~
```

Now, how beautiful is this, friends?
### Operation undo

How many times have you screwed something up in Git, which eventually resulted in a `git reset`? Well, undoing any operation—not just commits—in JJ is a single command: `jj undo`.

In JJ, every single command is added to the ["operation log"](https://jj-vcs.github.io/jj/latest/operation-log/). Each operation object contains a snapshot of how the repository looked at the end of the operation. `jj [op] undo` will roll back the repository to the previous state.  
Fun fact: you can undo the undo operation by executing it twice.

Do not confuse `undo` with `abandon`, which abandons a revision—and is therefore the equivalent of `git reset --hard`.
## Git co-location

To make the user transition smoother, JJ can be added to existing local repositories. This will enable both Git and Jujutsu simultaneously. Hence, a new `.jj` folder will be created next to the existing `.git` folder. The locally existing working copy, stashes, branches, and reflog will be kept intact.

For an even smoother transition, the maintainers have also prepared a detailed cheat sheet to interoperate between Git and JJ. You can check the [Git command table](https://jj-vcs.github.io/jj/latest/git-command-table/).

## Workflows

Two workflows have been popularized by [Steve Klabnik](https://steveklabnik.com/). Both have their Git-related counterparts:

1. Squash workflow – amending changes to a single commit
2. Edit workflow – small, individual commits (and fixups)

### Squash workflow

This workflow is very convenient—and honestly, this is how I prefer developing. I prefer to keep the `master` branch clean with single commits. I’m adding every piece of update into a single commit. Alternatively, we can enable squashing within the merge request or pull request.

|                | Git                                          | JJ                     |
| -------------- | -------------------------------------------- | ---------------------- |
| Initial change | `git add <file1>`<br>`git commit -m ...`<br> | `jj commit -m ...`<br> |
| Add change     | `git add <file2>`<br>`git commit --amend`    | `jj squash`            |

### Edit workflow

Another workflow is adding as many checkpoints (aka commits) as we can. This way, each change is well separated, and it follows the developer’s mindset and the state of the feature. Using this workflow, we often encounter situations when a change makes more sense in the middle of the branch.

|                      | Git                                                                                                                 | JJ                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Initial change       | `git add <file1>`<br>`git commit -m "A"`                                                                            | `jj commit -m "A"`                       |
| Add change           | `git add <file2>`<br>`git commit -m "C"`                                                                            | `jj commit -m "C"`                       |
|Insert middle change | `git rebase -i HEAD~1`<br>Mark `edit` commit<br>`git add <file3>`<br>`git commit -m "B"`<br>`git rebase --continue` | `jj new -B @ -m "B"`<br>`jj next --edit` |

## Configuration

JJ already has a vast spectrum of [configuration](https://jj-vcs.github.io/jj/latest/config/#user-config-files). In contrast to Git, it can be defined in a `config.toml` file (and has its own schema). The location of the config—just like in Git—can be specified for both user and project use. It’s highly advised to set your `[user]` [config](https://jj-vcs.github.io/jj/latest/config/#user-settings) as soon as possible, along with SSH or GPG keys to sign commits.

I’m still an early bird, but you can check my config in my [dotfiles](https://github.com/karesztrk/dotfiles/blob/master/.config/jj/config.toml).
### Advanced

Remarkably, JJ has its own functional language (adopted from Mercurial). We have already touched on it in the [[#Push]] chapter, where we selected the nearest bookmark.

Let's analyze it:
```sh
# ::@         - all ancestors of the working-copy
# @-          - parents of working-copy
# &           - intersection
# bookmarks() - all bookmark targets
# heads()     - branch tails 
jj bookmark move --from 'heads(::@- & bookmarks())' --to @-
```

The detailed documentation of the language and other useful functions, operators, patterns, and examples can be found in the [Revset documentation](https://jj-vcs.github.io/jj/latest/revsets/).

One of my favorites is how to select commits from an author whose name contains a specific word.

```sh
## look for commits from ktorok that has the 'matrix' word in it
jj log -r 'author(ktorok) & description(matrix)'
```
## Tools

Honestly, this is the part where Jujutsu is lagging behind. There aren’t many tools available, even though the CLI interface is outstanding! I’m a huge [lazygit](https://github.com/jesseduffield/lazygit) fan, so it’s quite painful to go back to the CLI again. I guess it’s the perfect3 way to familiarize myself with the advanced stuff. So don’t be lazy—learn the hard way!

Some goodies:

- [https://github.com/julienvincent/hunk.nvim](https://github.com/julienvincent/hunk.nvim) 📋
- [https://github.com/Cretezy/lazyjj](https://github.com/Cretezy/lazyjj) 🤩
- [https://github.com/idursun/jjui](https://github.com/idursun/jjui) 🚀

More can be found on their [Wiki page](https://github.com/jj-vcs/jj/wiki).
## Why JJ?

Well, for me, it’s always exciting to learn new technologies and ways of thinking. Since Git is the de facto VCS nowadays, it’s no longer a question of how any individual would benefit from learning a new way to manage changes.

If I have to add something, then:

- intuitive and easy-to-use CLI
- change-oriented (instead of branches)
- no staging area
- conflicts aren’t scary

It started to click slowly, but I’m already using it during daily development. Obviously, I need more practice, background knowledge, and experience. In the long term, I really think that JJ will radically make version controlling easy.
## Reference
- https://jj-vcs.github.io/jj/latest/
- https://v5.chriskrycho.com/essays/jj-init/
- https://steveklabnik.github.io/jujutsu-tutorial/
- https://zerowidth.com/2025/what-ive-learned-from-jj/
- https://medium.com/@shrmtv/jujutsu-150945f97753