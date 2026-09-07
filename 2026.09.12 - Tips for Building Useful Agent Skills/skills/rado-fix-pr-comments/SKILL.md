---
name: rado-fix-pr-comments
description: Fetch unresolved GitHub pull-request review comments, present them one by one, and fix the ones the user approves.
disable-model-invocation: true
---

# Fix Pull Request Review Comments

Fetch all review comments on the current branch's PR and walk through them interactively.

## Steps

1. **Get the PR number** for the current branch:

```
gh pr view --json number -q '.number'
```

2. **Fetch unresolved review threads** using the GraphQL API (the REST API does not expose resolved status):

```
gh api graphql -f query='
  query($owner: String!, $repo: String!, $pr: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $pr) {
        reviewThreads(first: 100) {
          nodes {
            isResolved
            comments(first: 10) {
              nodes {
                path
                line
                originalLine
                author { login }
                body
              }
            }
          }
        }
      }
    }
  }
' -f owner=OWNER -f repo=REPO -F pr=PR_NUMBER \
  --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | .comments.nodes[0] | "---", "File: " + .path + ":" + ((.line // .originalLine) | tostring), "Author: " + .author.login, "Body: " + .body, ""'
```

3. **Present each comment one at a time**. For each comment show:
- File and line number
- Author
- The comment body
- The current code at that location
- Your suggested fix (if you have one)

4. **Wait for user input** before proceeding. The user will either:
- Approve the fix (apply it)
- Give alternative instructions on how to fix
- Skip the comment

5. After going through all comments, **verify** fixes compile/pass lint by running the relevant quality check.

6. **Do NOT commit or push** unless explicitly asked.