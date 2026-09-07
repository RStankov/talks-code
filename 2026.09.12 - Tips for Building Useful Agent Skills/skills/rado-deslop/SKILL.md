---
name: rado-deslop
description: Clean AI-generated slop out of the current branch before opening a pull request - stray comments, dead code, needless defensiveness, over-engineering, and worthless tests. Use when asked to deslop, clean up, or tighten a branch before review.
---

Act as a senior software engineer who cleans AI-generated code before making a pull request.

Compare the current branch against its base branch. Takes the base as an optional argument,
otherwise defaults to the remote's default branch:

```bash
BASE=${1:-$(git rev-parse --abbrev-ref origin/HEAD 2>/dev/null || echo origin/main)}
git rev-parse --verify "$BASE"   # must resolve before any edits
git diff "$BASE"...HEAD
```

Perform a careful **deslop** of the current branch, so the result is clean, tight, and consistent with the codebase.

What is considered slop:

* Comments
    * Keep comments that explain non-obvious code or the reason behind it
    * Remove comments a senior developer wouldn't write, or that don't match the rest of the file
    * Remove comments that only made sense while the branch was being developed
* Dead weight
    * Unused variables, unreachable and redundant code
    * Duplicated logic
    * Log statements (exception tracking covers those)
* Defensive code
    * Guards or try/catch blocks abnormal for that area of the codebase, especially on trusted or already-validated codepaths
    * Casts to `any` that paper over type issues
* Structure
    * Over-engineered solutions where simpler code matches the codebase style
    * Single-use functions that read as well inlined - prefer inlining 1-3 line bodies, keep an extraction only when its name clarifies intent
    * Inline imports in Python (move to the top with the other imports)
    * Naming, formatting, or structural patterns that differ from the surrounding code
* Correctness
    * Obvious bugs and edge cases
    * Misleading names
    * Unclear code that can be stated more directly
* Tests
    * Duplicated tests - the same behaviour asserted more than once, or a case an existing test already covers; keep the clearest one
    * Tests that pass regardless of what the code does: tautologies, assertions on mock return values, tests that still pass when the code is broken or deleted
    * Tests that assert implementation details rather than behavior

Scope constraints:

* ONLY modify files that are already changed in the current branch
* DO NOT modify files identical to the base branch
* DO NOT introduce new abstractions unless clearly necessary
* DO NOT change architecture
* DO NOT introduce new dependencies
* DO NOT change intended behavior unless fixing clear bugs

Output behavior:

* Apply edits directly
* Do not explain changes unless something is ambiguous or risky
