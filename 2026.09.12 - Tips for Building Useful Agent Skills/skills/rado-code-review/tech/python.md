# Python

- Non-private methods, not prefixed with '_'
- Proper use of Django ORM (no raw SQL unless necessary)
- Parameterized queries (no string formatting in SQL)
- Use `enum.Enum` (or `IntEnum`) for any set of related constants instead of plain strings or integers
- `except` block that swallows or only logs an exception without re-raising or propagating it to the caller
- `transaction.atomic()` that wraps a single query or a block with no risk of partial writes
- `logger` call that isn't propagating an error to Sentry — logging should not be used for general info/debug output
- Empty `__init__.py` with no purpose, placeholder module, or stale README added by this diff
- `if`/`elif` chain that maps one value to another — use a dict lookup
- Loop that commits per item — validate the whole batch before writing any of it, or a mid-loop failure leaves inconsistent state
