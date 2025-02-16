---
tags:
  - date
  - time
  - formatter
  - picker
  - component
  - calendar
date: 2025-02-16
---
So here we are again—this time with a problem that was supposed to be easy: finding a modern, accessible date and time picker library to replace our old solution. I thought this would be simple, given the vast JavaScript ecosystem. But the result was surprising.
## How to tackle this? 
I usually start with a good old Google (or [DuckDuckGo](https://duckduckgo.com/)) search and click through each result.

My general criteria:
- Popularity
- Maintenance status
- Modernity (ES6 and up-to-date APIs)
- Bundle size

This gives me a good overview of the "market." If I want to dive deeper, I also ask LLMs (like Claude) and extract every little detail from them.

## Constraints
But there’s more to it than meets the eye. My project had its own constraints when choosing a library:
- It shouldn’t be part of a larger framework (no [MUI](https://mui.com/), thanks).
- It shouldn’t rely on [Tailwind](https://tailwindcss.com/).
- It must support time selection.
- It must support range selection.
- (Optional) React support.
- Bonus if it includes presets (like Today, Tomorrow, etc.).
- Bonus if it uses [date-fns](https://date-fns.org/).
## Results
This list isn’t in any particular order—it simply reflects my project’s specific needs. Make sure to do your own research before choosing a library.

| Library                          | Range support | Time support | Lightweight size | Custom rendering | 3rd-patry deps.  | Type          |
| -------------------------------- | ------------- | ------------ | ---------------- | ---------------- | ---------------- | ------------- |
| `react-datepicker`               | ✅             | ✅            | ✅                | ✅                | None             | React         |
| `react-flatpickr`                | ✅             | ✅            | ✅                | ✅                | Flatpickr        | React wrapper |
| `react-dates` (Airbnb)           | ✅             | ❌            | ❌                | ✅                | ❌ Moment.js      | React         |
| `react-multi-date-picker`        | ✅             | ✅            | ✅                | ✅                | None             | React         |
| `react-daterange-picker`         | ✅             | ❌            | ✅                | ✅                | None             | React         |
| `@duetds/date-picker`            | ✅             | ❌            | ✅                | ✅                | Web Component    | Web Component |
| `react-datetime-picker`          | ❌             | ✅            | ✅                | ✅                | `react-calendar` | React         |
| `react-nice-dates`               | ✅             | ✅            | ✅                | ✅                | ❌ Day.js         | React         |
| `react-datetimerange-picker`     | ✅             | ✅            | ✅                | ✅                | `react-calendar` | React         |
| `react-calendar-datetime-picker` | ✅             | ✅            | ❌                | ✅                | ❌ Day.js         | React         |
| `vanilla-datetimerange-picker`   | ✅             | ✅            | ✅                | ❌                | None             | Vanilla JS    |
| `@eonasdan/tempus-dominus`       | ✅             | ✅            | ❌                | ✅                | ❌ Bootstrap 5    | Vanilla JS    |
| `flatpickr`                      | ✅             | ✅            | ✅                | ✅                | None             | Vanilla JS    |
| `pikaday`                        | ❌             | ❌            | ✅                | ✅                | ❌ Moment.js      | Vanilla JS    |
| `react-day-picker`               | ✅             | ❌            | ✅                | ✅                | None             | React         |
| `cally`                          | ✅             | ❌            | ✅                | ✅                | None             | Web Component |
| `air-datepicker`                 | ✅             | ✅            | ✅                | ✅                | None             | Vanilla JS    |

## Trial and error
I found three libraries that seemed like the best candidates:

- `react-datepicker` 
- `react-multi-date-picker`
- `air-datepicker`

I tried integrating each of them, but unfortunately, none were a perfect fit to my project. And that’s totally okay—I had a lot of strict requirements, just like everyone else before me, which is what led to the creation of these libraries in the first place.

I also want to take a moment to appreciate the open-source maintainers behind these projects. Working with date and time is tough, and their efforts are truly valuable.

### Issues

| Library                   | **Issues**                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-datepicker`        | Its great that uses `date-fns` and `floating-ui`. Start of the week can only be modified with Locales from `date-fns`.<br><br>Cannot set `fixed`position strategy using Popper modifiers. |
| `react-multi-date-picker` | Uses awkward time picking: spinners. Poor UX.                                                                                                                                             |
| `air-datepicker`          | Date & Time format must be passed separately. Our app has it in a single expression. Seconds are not formatted.                                                                           |
## I walk my way
So, what was the solution? Well, I sprinkled some CSS over our own component, and voilà—it looks perfect and fits seamlessly into our Design System.

I also had to reconsider and extend the component’s accessibility, but I’m quite proud of the result.

Unfortunately, I can’t share the source code, but I’ll post some pictures as soon as possible. So, keep an eye on this blog post!

## References
- https://reactdatepicker.com/
- https://shahabyazdi.github.io/react-multi-date-picker/
- https://air-datepicker.com/






 