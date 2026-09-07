---
name: rado-code-review-pr
description: Review a GitHub pull request in an isolated git worktree, without touching the current working tree. Accepts a PR URL or number.
disable-model-invocation: true
---

# Code Review PR

Review a GitHub pull request without modifying your current working tree. Fetches the PR into a temporary `git worktree`, runs the full code review from the `rado-code-review` skill, then cleans up.

## Guidance

- When posting PR review findings to GitHub, always anchor comments to specific diff lines as an inline review — never post as top-level/bundled comments.
- Don't use over-long sentences, explain issues simply.

## Steps

### Step 1 — Fetch the PR

**Parse the input.** Accept either a full GitHub PR URL (`https://github.com/owner/repo/pull/123`) or a bare PR number. If no input is provided, use the PR for the current branch.

**Fetch PR metadata:**

```bash
gh pr view <url_or_number> --json number,headRefName,baseRefName,title,body,url
```

**Fetch the PR head into a local branch:**

```bash
NUMBER=<pr_number>
BASE=<baseRefName>   # e.g. main

git fetch origin pull/$NUMBER/head:pr-$NUMBER-review
```

### Step 2 — Run the code review

Get the diff against the base branch:

```bash
git diff origin/$BASE...pr-$NUMBER-review
git log origin/$BASE...pr-$NUMBER-review --oneline
```

Run the `rado-code-review` skill and follow its steps — including spawning its review and double-check subagents — and OUTPUT REVIEW EXACTLY as its `Step 4 - Output`. The base branch for diffing is `origin/<baseRefName>`, not `main`.

Include the PR title and description as context when evaluating intent and completeness.

### Step 3 — Interactive Q&A

After delivering the review, stay in context. The diff and PR metadata are loaded — answer follow-up questions about the PR without re-fetching.

To read a specific file from the PR branch in depth:

```bash
git show pr-$NUMBER-review:path/to/file
```

### Step 4 — Clean up

Only clean up when the user explicitly says they are done with the PR. Do not clean up automatically after delivering the review — they may want to explore further.

When the user confirms they're done:

```bash
git branch -D pr-$NUMBER-review
```
