---
tags:
  - zig
  - ai
date: 2026-06-19
---

Part of being a programmer means that we always try to learn new things, frameworks, languages. This time I picked Zig. I think that it got the most traction when [Mitchell Hashimoto](https://mitchellh.com/) started Ghostty. Even my friend David Bushell often proves that he [mastered the language](https://dbushell.com/2025/01/27/zig-the-good-parts/). So I thought why not jump into it?

[Zig](https://ziglang.org/) is a powerful modern language. And if you know me then you know that I often doesn't follow the crowd. I consider myself an outcast, a wanderer who is the master of things of unknown - even ancient - knowledge. This was the case when I started learning [Rust](https://rust-lang.org/), [Gleam](https://gleam.run/) or even [NeoVim](https://neovim.io/). I enjoy using new stuff until it's not in the mainstream.

My thoughts on AI perfectly fit into this thread. I enjoyed it at the beginning: I was fascinated by how "clever" it is and how it can help to solve my problems. But soon I realized that I basically outsourcing my cognitive load. This very fast becomes a death spiral:

- You trust the LLM/agent for a task (doubt)
- It does the work for you (dopamine)
- You missed learning and solving a problem (suffering)
- You trust the LLM/agent again for another task (doubt)

And this goes indefinitely. Do no think that thousand of generated lines of code can be production level. You can't be a responsible adult for your own work.

However, these days the world seems bowed before this phenomenon. It's spreading like wildfire. Not to mention the very-very serious impact on our planet caused the gigantic electricity consumption to feed these models.

Thanks to many clever people - who I follow -, I was able to escape from this vicious cycle:

- [David Bushell](https://dbushell.com/)
- [Chris Ferdinandi](https://gomakethings.com/)
- [Kevin Powell](https://www.kevinpowell.co/)
- [Andy Bell](https://bell.bz/)
- [Dylan Beattie](https://dylanbeattie.net/)
- and this time [Andrew Kelley](https://andrewkelley.me/) (creator of the Zig language and the president of the [Zig Software Foundation](https://ziglang.org/zsf/))

Andrew's [recent talk](https://youtu.be/iqddnwKF8HQ?si=wvtHY5zj_t1zSZYK) was fascinating. I enjoyed that such a clever person shares many of my thoughts. This encouraged me to learn Zig even more. And how did I start? I have became a [Zigling](https://codeberg.org/karesztrk/ziglings), I do my best with the exercises until I tinker enough to start a side-project (aka. not being a noob).

Check Dylan's [recent talk](https://youtu.be/xunx7VvlOgs?si=yAQ6ApyPBALCV13r) from NDC conference if you are curious why the majority of people use AI and what will be the consequences.

## Fibonacci

I want to circle back to one of my old challenge to create a Fibonacci program. This demonstrates really well two things that I like in Zig:

- Exhaustive `switch` statements
- Easy-to-digest `for` statements

```zig
/// Calculates the Fibonacci number for the given input number.
export fn fibonacci(n: usize) u64 {
    var prev: u64 = 0;
    var curr: u64 = 1;

    switch (n) {
        0 => return prev,
        1 => return curr,
        else => {
            for (2..n + 1) |_| {
                const next = prev + curr;
                prev = curr;
                curr = next;
            }

            return curr;
        },
    }
}
```

You can recall from my [old blog post](/blog/learning-wasm) that the Rust-based WASM compilation is done by another library. However, Zig has a built-in cross-compilation system. [The build system](https://ziglang.org/learn/build-system/) was very intimidating (especially after executing `zig init` command) but I slowly got used to it. _Zig 0.16_ treats WASM binaries as executables (just like a main program) without an entry point (`pub fn main`).

The compilation target must be [wasm32-freestanding](https://ziglang.org/documentation/0.16.0/#Freestanding). This means that we are targeting the browser without any WASM runtime. The optimization strategy is preferred to be [ReleaseSmall](https://ziglang.org/documentation/0.16.0/#toc-ReleaseSmall) since we want to spare the network bandwidth and costs.

```zig
const wasm = b.addExecutable(.{
    // Name of the module
    .name = name,
    .root_module = b.createModule(.{
        // Source code root
        .root_source_file = b.path("src/fibonacci.zig"),
        // Selected compilation target
        .target = target,
        // Selected optimization strategy
        .optimize = optimize,
    }),
});
```

I published my small project onto [Codeberg](https://codeberg.org/karesztrk/fibo).

## Conclusion

This project obviously was not a big deal for any programmer. What I really want to emphasize is to always learn and never let yourself down by outsourcing thinking. Even if your employer gives you unlimited AI usage (and freezes the training budget - yes, it's happened). Prefer your own judgement and be skeptical. Use search engines (public or meta), experiment, practice and fail gracefully. This is natural.

## References

- https://ziglang.org/
- https://0xkiire.com/wasm-with-zig/ 💯
- https://codeberg.org/karesztrk/fibo
- https://ziglang.org/documentation/0.16.0/
- https://dbushell.com/2025/01/27/zig-the-good-parts/
