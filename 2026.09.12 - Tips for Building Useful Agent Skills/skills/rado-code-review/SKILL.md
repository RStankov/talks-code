---
name: rado-code-review
description: Review a branch, PR, or working-tree changes against a base branch. Spawns isolated subagents to find issues, verify them, and — when a written plan exists — check the diff against it. Use when asked to review code, review a PR, or review changes since a branch.
---

# Code Review

You orchestrate a code review. You do not perform it.

The review runs in fresh subagents — one finds issues, one tries to kill them, and a third checks the diff against a written plan when one exists. None of them sees your context, so none is influenced by the reasoning that produced the code. If you wrote this code in this session, that is exactly the point: do not review the diff yourself, do not pre-judge findings, do not defend the code to the subagents. Your job is git plumbing and formatting.

## Steps

### Step 1 - Get the diff

```bash
BRANCH=${1:-main}
git rev-parse --verify $BRANCH    # must resolve before anything is spawned
BASE=$(git merge-base $BRANCH HEAD)
git diff $BASE                    # all changes, including unstaged
git log $BASE..HEAD --oneline     # commit summary
```

Diff against the merge-base, not the branch tip — otherwise everything the base branch gained since this work started shows up as part of the review.

If the ref doesn't resolve or the diff is empty, stop and report it. Don't spawn anything.

### Step 2 - Look for a written plan

Only look; never ask. Most reviews have no plan and that is fine.

In order, stop at the first hit:

1. An issue or PR referenced in the commit messages (`#123`, `Closes #45`) — fetch it with `gh`.
2. A path the user passed as an argument.
3. A file under `docs/`, `specs/`, `plans/`, or `.scratch/` matching the branch name or feature.

If nothing turns up, skip the spec agent in Step 3 and drop the Spec section from the output. Do not substitute your own understanding of the change for a plan — an unwritten intent is not a spec.

### Step 3 - Review

Spawn the reviewer (`general-purpose`) with the prompt below, and — only if Step 2 found a plan — the spec agent in the same message so they run in parallel. Substitute `{BASE}` with the merge-base SHA from Step 1 and `{SKILL_DIR}` with the absolute path of the directory holding this SKILL.md.

Pass them nothing else. No summary of the change, no explanation of intent, no list of what you think is risky.

<prompt>
You are a senior software engineer reviewing a proposed code change. You did not write this code and have no context on why it was written.

Read `{SKILL_DIR}/SKILL.md` and follow its "Review Philosophy", "How to write findings", and "Review Checklist" sections. Skip its "Steps" section — that is orchestration, not your job.

Get the diff:

```bash
git diff {BASE}
git log {BASE}..HEAD --oneline
```

Read the full files behind the diff, not just the hunks.

Report everything that looks suspicious, even if you're not certain — a later pass will filter. Prefer over-reporting to under-reporting.

Return findings as data, not as a report. Numbered list, one entry per finding, each with: priority (P0-P3), area (Correctness / Security / Quality / Tests / Technology / Performance / QA), title, `path/to/file:line`, description, and replacement code where you have concrete code to swap in. Then a separate list of any items raised by the "Suggest:" callouts. No summary paragraph, no ratings table, no preamble.
</prompt>

Spec agent — spawn only when Step 2 found a plan. Substitute `{PLAN}` with its path or fetched contents.

<prompt>
You are checking whether a code change does what it was asked to do. You did not write this code or this plan.

The plan:

{PLAN}

Get the diff:

```bash
git diff {BASE}
git log {BASE}..HEAD --oneline
```

Read the full files behind the diff, not just the hunks.

Report three lists, quoting the plan line for every finding:

1. **Missing** - requirements the plan asked for that are absent or only partially implemented.
2. **Unasked** - behaviour in the diff the plan didn't call for. A refactor or fix needed to make the plan work is not scope creep; a new feature is.
3. **Wrong** - requirements that look implemented but where the implementation doesn't match what the plan describes.

Judge against what the plan says, not against how you would have built it. If the plan is silent on something, it belongs in no list. Return data, not a report. Omit empty lists.
</prompt>

### Step 4 - Double check findings

This applies to the reviewer's findings only. Spec findings skip it — a missing requirement can't be dismissed by reading the file more carefully.

Spawn a second subagent (`general-purpose`) — a sibling of the reviewer, not a child of it. Pass it the reviewer's findings verbatim and the base. Do not pass the reviewer's reasoning, and do not add your own opinion on which findings look weak.

If the reviewer returned no findings, skip to Step 5.

<prompt>
You are a skeptical second-pass reviewer. You did not write this code and you did not write these findings.

Base: {BASE}

Findings to check:

{FINDINGS}

For each finding:

1. Read the FULL file, not just the diff
2. Actively seek disconfirming evidence: existing validations, type guarantees, runtime constraints, upstream callers, test coverage, framework behavior
3. Assume the original code is correct until proven otherwise
4. Discard any finding you can explain away with evidence

Return the survivors in the structure you received them, each with one added line stating what disconfirming evidence you looked for and why it wasn't sufficient to dismiss it. Then list the discarded findings as number plus a one-line reason. Return data, not a report.
</prompt>

Findings that pass the double check go to next step.

### Step 5 - Output

Relay the surviving findings as written. Don't re-word them, don't soften them, don't add caveats, don't reinstate anything the double check discarded.

Spec findings stay in their own section. Don't merge them into the priority list, don't rerank them against it — a change can follow every rule and build the wrong thing, and keeping the axes apart is what stops one from masking the other.

If no findings at all:

<output>
No significant issues found. 🚀
</output>

Otherwise:

1. Collect all findings. If more than 10 remain, keep the highest-priority ones.
2. Group and sort P0 → P3. Separate each finding with two blank lines.
3. List spec findings under their own heading. Omit the whole section when no plan was found — say nothing about its absence.
4. List all suggestions - deduplicate and omit if none.
5. Rate each area 1–10 based on severity and count of issues (10 = no issues).

<output>
# Code Review

[1 paragraph summary of changes]

## Findings

**#N[number] 🔴 P0 / 🟠 P1 / 🟡 P2 / ⚪️ P3** - [title] (`path/to/file:line`)

[description]

```suggestion
replacement code
```

## Spec

**Missing** / **Unasked** / **Wrong** - [finding] (`path/to/file:line`)

> [quoted plan line]

## Suggestions

[list of suggestions]

## Overview

| Area        | Rating | Notes |
|-------------|--------|-------|
| Correctness | X/10   | [note]|
| Security    | X/10   | [note]|
| Quality     | X/10   | [note]|
| Tests       | X/10   | [note]|
| Technology  | X/10   | [note]|
| Performance | X/10   | [note]|
| QA          | X/10   | [note]|

Total findings: [total findings]

</output>

## Review Philosophy

- Ask "will this work?" - not "is this how I would have done it?"
- Flag only issues introduced by this diff, not pre-existing problems.
- Be selective: maximum 10 findings total. Only report an issue if you can point to the specific code that is wrong and explain exactly how it breaks.
- Match the codebase's rigor level - don't demand validation, tests, or comments not present elsewhere in the same codebase.
- Discrete and provable - each finding must be a single, specific issue with identifiable affected code; don't speculate or bundle multiple problems into one.
- Author would fix it - only flag issues the author would likely address if made aware, and that aren't evidently intentional.
- Hold modifications to existing code to a higher bar than new isolated code — added complexity in an existing file is harder to justify.

## How to write findings

- **State why** it's a problem, not just the bug class.
- **State the conditions** - explicitly name the scenario, input, or environment where the issue manifests. If it only triggers under specific conditions, say so upfront.
- **Quantify the impact** where the code lets you - "adds one query per row, ~50 per page load" beats "may be slow"; "silently drops every record after the first 100" beats "pagination issue".
- **Be brief** - 1 paragraph max. No line breaks within natural language flow.
- **No long code blocks** - inline code or snippets of 3 lines max; use a `suggestion` block only for concrete replacement code.
- **Matter-of-fact tone** - not accusatory, not flattering. No "Great job on X, but..." or "Thanks for...". Write as a helpful reviewer, not a human colleague trying to soften a blow.

## Review Checklist

Act as a senior developer who is deeply familiar with this codebase and is reviewing this diff with a critical eye.

Scan in this order — the first pass is where the expensive findings are:

1. **N+1 queries** first, every time. Check every loop, serializer, and view for association access that isn't eager-loaded. It is the most common real finding in any diff.
2. **Security and access control** - IDOR, permission checks that should be scoped to the record, PII or secrets reaching logs, views, or the client bundle.
3. **Breaking changes** - a field or contract another consumer depends on.
4. **Locking and transactions** - external calls inside transactions, multi-step writes without one.
5. Then architecture placement, correctness, tests.
6. Naming, i18n duplication, and dead code last - real, but lower stakes than the above.

### Correctness

Check for bugs, logic errors, and data integrity issues.

**P0**
- Obvious bugs - code that is clearly wrong and will never work as written (e.g. always-false condition, return before effect, wrong variable used)
- Conflicting functionality - two changes in the diff that contradict each other, or a change that directly breaks existing behavior elsewhere in the same diff
- Breaking change - a field, response shape, column, or contract another consumer depends on (mobile API, another service, another team's integration) removed, renamed, or retyped

**P1**
- Data loss - destructive operations without guards, broken transactions
- Silent failures - empty catch blocks, swallowed errors without logging; prefer propagation over local recovery — if the current scope cannot fully recover while preserving correctness, rethrow (optionally with context) rather than returning fallbacks like `null`/`[]`/`false`; JSON parsing should fail loudly by default, quiet fallback only acceptable with an explicit compatibility requirement; boundary handlers (HTTP routes, CLI entrypoints) may translate errors but must not pretend success or silently degrade
- Crashes - nil/null dereference, division by zero
- Silent partial failure - a batch where some items can succeed and others fail, leaving inconsistent state nothing detects; validate everything before committing anything
- Deleted code - for significant deletions, verify: (a) intentional for this diff, (b) no existing workflow depends on it, (c) logic moved elsewhere rather than lost

**P2**
- Logic errors - off-by-one, wrong conditionals, incorrect boolean logic
- Race conditions - missing synchronization on shared state
- Missing input validation - causes incorrect behavior (security implications handled separately)
- Async correctness - missing `await`, dropped promises, read-before-write ordering
- Empty collection handling - `first`, `last`, or index access without nil/bounds guard
- Error identity - errors compared against message strings instead of stable codes or error types (breaks silently when message text changes)

> **Suggest:** updates to documentation if the changed behaviour isn't reflected elsewhere.

### Security

Check for security vulnerabilities introduced by this diff.

**P0**
- Data leakage - PII, financial info, tokens exposed in API responses, logs, or error messages to unauthorized parties
- SQL injection - user input interpolated into SQL strings
- Command injection - user input passed to `system`, `exec`, backticks, `Open3`
- Exposed secrets - API keys, passwords, tokens hardcoded or committed; backend secrets leaked in client bundles or debug endpoints
- Unsafe deserialization - `Marshal.load`, `YAML.load` (not `safe_load`) on untrusted input
- Unverified signature - JWT decoded rather than verified, algorithm taken from the token's own header (`alg: none`, HS256 signed with the RSA public key), or webhook payload parsed before its HMAC is checked
- Whole-model serialization - `render json: user` with no field allowlist, shipping the password digest, reset token, and every sensitive column added later
- XSS - user content rendered unescaped, or via `html_safe` / `raw`
- Missing authentication - new route or action with no auth check
- Missing authorization - authenticated but not checking resource ownership
- Mass assignment - model accepts params without a strong parameters whitelist
- CSRF - state-changing action skips CSRF protection without a documented reason
- Path traversal - user input used in file paths without sanitization
- Insecure direct object reference - record loaded by ID without scoping to current user
- Client-supplied privilege - role or `isAdmin` flag read from request body and trusted server-side
- Missing tenant/org/account filter - lookup by natural key (email, slug, name) without scoping to the current tenant, allowing records from other orgs to match

**P1**
- Missing input validation - user-supplied values accepted without type, format, length, or range checks at trust boundaries
- Overly broad permissions - role check looser than required
- Timing attack - secret/token comparison using `==` instead of constant-time compare
- SSRF - user-supplied URL fetched server-side without allowlist validation; also flag validation that follows redirects or checks the hostname rather than the resolved IP
- Open redirect - unvalidated redirect URL parameter; OAuth `redirect_uri` matched by prefix or substring instead of exact equality
- File upload - no MIME type or extension validation, user-controlled filename in path
- Zip-slip - archive extracted without validating entry paths
- Uploads served back from the primary origin - an uploaded SVG or HTML file becomes stored XSS in your own origin
- Weak cryptography - MD5/SHA1 for passwords, plaintext secret storage
- Insecure cookies - session cookie missing `Secure`, `HttpOnly`, or `SameSite` flags
- Session fixation - session ID not regenerated on login
- Permissive CORS - `Origin` reflected back, or matched by prefix/suffix (`notexample.com`, `example.com.evil.com`), on an API that carries credentials
- Reset token - non-expiring, reusable, guessable (`rand`, timestamp, sequential), or still valid after a password change
- Account enumeration - login, signup, or reset reveals whether an account exists, through the response or through timing
- Rate limiting absent - auth, password-reset, or OTP endpoints with no brute-force throttle
- Lockout with no IP throttle - anyone who knows an email can lock that account at will
- Stack trace / verbose error leaked to client
- Client-supplied facts - price, quantity, discount, role, or status read from the request instead of owned by the server
- Race condition - balance/quota checked then updated non-atomically
- Uniqueness enforced only in the app layer - the validation races; needs a DB unique index

Do not flag: theoretical risks that require unlikely preconditions; issues only exploitable with admin access already granted; defense-in-depth suggestions when primary defenses are adequate; issues in unchanged code this diff doesn't affect; "consider using library X" style suggestions; a sink the framework parameterizes or auto-escapes, absent an explicit bypass; input already constrained upstream (an integer-coerced param carries no payload); a control that exists one layer up — middleware auth, a parent controller's `before_action`, edge rate limits — go look before claiming it's absent.

### Code Quality

Check for code quality and maintainability issues. Read `tech/code-smells.md` from this skill's directory — it applies to every diff regardless of language.

**P1**
- Naming locked by contracts and hard to change later - API field names, DB columns, serialized keys
- Code in the wrong layer - business logic in a controller, view logic in a model
- Architecture placement - logic that only one caller needs living in a shared model, request params handled outside the form object that already owns this area, standalone business logic that should be a service object, a concern extracted before the behaviour is actually duplicated
- Circular dependency between layers - a model depending on a form while the form depends on the model

**P2**
- Dead code introduced by this diff
- Orphaned code - existing code left unreferenced *by* this diff; when a helper, component, constant, or route is replaced rather than edited in place, grep the old name across the codebase and flag it if the diff removed its last caller
- Duplicate logic - 3+ identical blocks → extract; fewer → leave inline
- Over-abstraction - indirection with no current benefit
- 1–3 line methods used in only one place - adds indirection without aiding readability
- Commented-out code
- Boolean flag arguments - should be two separate methods
- Magic numbers or strings - use named constants
- Negative conditionals - invert where possible (`if !user.inactive?` → `if user.active?`)
- Conditional chain that maps one value to another - an `if`/`elsif` or `case` doing lookup work belongs in a hash/map or polymorphic dispatch
- Near-duplicate translation key - reuse the existing key instead of adding a variant of it
- Unclear naming - if you can't understand what a function/class/variable does within 5 seconds from its name alone, it fails; flag with a suggested rename
- New dependencies - unnecessary, poorly isolated, or a better-known alternative exists

**P3**
- Conventional orderings broken - controller actions out of `index show new create edit update destroy` order, and similar house orderings the codebase keeps
- Flag any files that are out of place in this diff
- Flag any catch block that silently ignores or only logs an error, as this hides bugs. Acceptable only if the error is expected due to external input, user action, or network conditions.

> **Suggest:** extraction of reusable functionality where a pattern emerges across the diff.

### Tests

Check for test coverage and test quality. Judge coverage quality, not line coverage percentage.

**P1**
- New or changed major business logic with no tests at all
- Service object added without a spec - standalone business logic ships with its test
- Critical paths (auth, payments, data writes) with no coverage
- Fake tests - assertions that pass regardless of what the code does: tautologies, assertions on mock return values, a test that still passes when the code under test is broken or deleted

**P2**
- Tests only cover the happy path for error-prone logic
- Missing negative tests for validation or authorization
- Tests that test implementation details rather than behavior (break on refactor)
- Test isolation issues - shared mutable state, tests that pass alone but fail in suite order
- Tests that make real external calls - email, HTTP, payment APIs not mocked or stubbed
- Missing coverage for edge cases in error-prone logic
- Redundant or duplicated tests - the same behaviour asserted by more than one test, or a case already covered by an existing test; keep the clearest one and delete the rest
- `let!`, or `let` used heavily - implicit dependencies between examples and delayed evaluation that surprises readers; setup belongs inline in the test body
- Expensive setup repeated per scenario in slow feature/e2e specs - combine into one scenario that pays the setup once, with `# test: ...` comments labelling each section
- Factory with expensive defaults - attached files or heavy associations that every caller pays for; belongs behind a trait

Do not flag: untested trivial code, gaps covered by tests outside the diff, code covered by type system.

### Technology

Read the guideline files relevant to the technologies present in the diff, from this skill's directory.

| Technology | Guidelines |
|---|---|
| Any language | `tech/code-smells.md` |
| Database & migrations | `tech/database.md` |
| GraphQL | `tech/graphql.md` |
| Python | `tech/python.md` |
| React | `tech/react.md` |
| React + GraphQL | `tech/react-graphql.md` |
| TypeScript | `tech/typescript.md` |
| Ruby / Rails | `tech/ruby.md` |
| Tailwind CSS | `tech/tailwind.md` |

### Performance

**P1**
- Repeated queries inside loops when a single batched query would suffice - check every loop, serializer, and view for association access that isn't eager-loaded
- Repeated `.count` / `.where(...).count` in a view or hot path - use a counter cache column
- Missing index hints or query optimizations on large collection lookups
- Missing indexes on columns used in filters, ordering, or joins

**P2**
- O(n²) or worse algorithms without justification
- Unbounded data structures or memory leaks in long-running processes
- Expensive computations in loops that could be memoized
- Fetching more data than needed when a subset would suffice
- Missing pagination for large datasets

Do not flag: premature optimizations, caching for loads that aren't yet measured as slow.

### QA

Check for missing functionality, broken flows, and UX gaps.

**P0**
- Missing functionality - implied by the feature but not implemented
- Broken user flows - action has no result or leads to a dead end
- Data loss risk - unsaved state lost on navigation

**P1**
- Confusing UI - no clear affordance or feedback for the user's action
- Missing confirmation for destructive actions
- Silent failures - no user feedback when something goes wrong
- Misleading copy - a message that implies success when part of the work silently failed

**P2**
- Inconsistent terminology across screens
- Success feedback missing after completing an action
- Permissions not reflected in UI - unavailable actions still shown

**P3**
- Copy issues - placeholder text, grammar errors, inconsistent capitalisation
- Accessibility basics - missing labels, broken keyboard navigation

> **Suggest:** additional features, admin tooling, or UX improvements worth considering.
