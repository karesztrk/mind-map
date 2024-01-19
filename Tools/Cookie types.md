---
tags:
  - cookie
  - strict
  - lax
  - http
  - post
  - get
  - samesite
---
| XSS Request type | Example                  | Normal cookie | Lax | Strict |
| ------------ | ------------------------ | ------------- | --- | ------ |
| link         | `<a href...>`            | ✅            | ✅  | ✅     |
| prerender    | `<link rel="prerender">` | ✅            | ✅  | ✅     |
| form get     | `<form method="get"`     | ✅            | ✅  | 🚫     |
| form post    | `<form method="post"`    | ✅            | 🚫  | 🚫     |
| iframe       | `<iframe>`               | ✅            | 🚫  | 🚫     |
| ajax         | `$.get(...)`             | ✅            | 🚫  | 🚫     |
| image        | `<img src="..."`         | ✅            | 🚫  | 🚫       |

