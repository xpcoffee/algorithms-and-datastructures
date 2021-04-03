# Algorithms and Datastructures

This holds my own exercises on algorithms and datastructures. The intent is to use these to illustrate/refresh my understanding.

> ## :rotating_light: :warning: Warning :warning: :rotating_light:
>
> Please consider the following very carefully before reusing code in this repo:
>
> 1. This code has **not** been thoroughly optimized and tested.
> 1. This code is **not** actively maintained.
> 1. I do **not** recommend this code for use in production systems.

## Tenets

-   **Code/illustrate concepts** - it's easier to understand concepts in isolation. To enable this, concepts should be coded independently. A new file/class/set of functions should be added for every new concept.
-   **Re-use prior concepts to implement new ones** - many concepts build on top of previous ones, we should illustrate this in code. Import the prior concepts that are used to build up the new one. This will help to keep new concepts concise and to create a set of concepts that work well with one another by design.
-   **Prove concepts via illustrative tests** - tests show us what the concepts should do. Having examples that can be run can also allow consumers to place breakpoints in the code to figure out _how_ the code works in practice.

## Git hooks

Hooks are configured and run using [husky](https://github.com/typicode/husky) (which was recommended for windows support over [git-hooks](https://github.com/tarmolov/git-hooks-js/issues/36)).

Find the hooks in the `.husky` directory.

**[Pre-commit](.husky/pre-commit)**

Runs tests automatically before committing. If you run into the **_very rare_** situation where you **_need_** to commit without running tests, use the following:

```
git commit --no-verify
```
