---
name: rado-code-review-pr-comment
description: Turn code review findings into inline PR comments written in my voice, one at a time, for me to review and post myself.
disable-model-invocation: true
---

# Code Review PR Comment

Takes code review findings that are already in context and drafts them as inline PR comments, one at a time, so I can review each one before it goes out.

## Never post

I post the comments myself. Do not run `gh api`, `gh pr comment`, `gh pr review`, or anything else that writes to GitHub. Only post if I explicitly ask you to in a later message.

## Voice

Every comment goes out under my name, so it has to sound like me. Read `STYLE.md` in this skill directory before drafting the first comment and follow it for every comment, including rewrites.

## Steps

### Step 1 - Collect the findings

Use the review findings already in context, wherever they came from. If none are loaded, ask which review to draft.

If I asked for a subset, filter to those. Otherwise take all of them. Count them, that count is the denominator.

### Step 2 - One comment at a time

Show one comment per turn. Never dump the whole batch.

Each turn shows:

```
Comment: 2 / 12
app/models/user.rb:42
```

Then show me the code snippet this comment is for, so I can understand the comment better and the comment body exactly as it would appear on GitHub.

Before showing a comment, check it against `STYLE.md`:

- The marker is earned. 🚨 only if it blocks the merge, ✂️ only for code that goes away, no marker otherwise.
- The `suggestion` block applies cleanly to the lines it is anchored to.
- Every claim about behavior was traced in the code. If it wasn't, it is phrased as a question.
- One to three sentences, unless it is a refactor proposal with numbered steps.
- Nothing from the "What to avoid" list is in it.

A comment that fails a check gets fixed before I see it. Don't show it with an explanation of what's wrong with it.

Then stop and wait. I will either accept it, ask a question, tell you to rewrite it, or drop it. Answer questions and rewrite in place, re-showing the comment with the same counter, until I accept or drop it. Move to the next one only when the current one is settled.

### Step 3 - Hand off

The PR is done when every comment has been accepted or dropped.

Then print the accepted comments as one list, each with its `file:line` and body, ready for me to paste into GitHub. Note anything I dropped and anything that landed outside the diff, with its real location.

### Step 4 - Clean up PR

Consider PR to be done and clean it up.
