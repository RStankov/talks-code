# Database and Migrations

- Irreversible destructive migration (dropping a column with data, type change that truncates) — needs backup plan before staging/production deploy.
- Non-nullable column added without a default — fails on existing rows.
- Missing foreign key constraints.
- New columns or queries with no index.
- Boolean column that should be a datetime (booleans lose the "when").
- `change` migration that isn't actually reversible.
- `create` / `update` instead of `create!` / `update!` — silent failure on validation errors.
- New query with a potential N+1.
- Column names that will be awkward long-term.
- Missing `null: false` where field is always required.
- Flag migrations that cause downtime.
- Repeated `.count` / `.where(...).count` in a view or hot path — use a `*_count` counter cache column.
- External API call or large write inside a `transaction do` block — holds DB locks for as long as the call takes.
- Check-then-act without a transaction (`exists?` then `create`, `find` then `delete`) — a race condition under concurrent requests.
- Uniqueness enforced only by a validation — needs a unique index; the validation races.
- Non-concurrent index build on a large or hot table — locks writes.
- Query or loop pulling thousands of rows into app memory instead of `find_each`, pagination, or a background job. Quantify it: "100 messages × 100 buildings is 10,000 records loaded".
