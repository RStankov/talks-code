---
name: rado-database-structure-formatting
description:
disable-model-invocation: true
---

# Database Structure Formatting

Present every table, record, and schema proposal in this format for the rest
of the conversation.

```
[table]
  [column]
  [column] - [description]
  [column] - [description] (enum value, enum value)
```

## Rules

- Exclude `id`, `created_at`, `updated_at`.
- Description is optional — omit it when the column name says everything.
- `[name]_id` drops the suffix: `author - record, who wrote it`
- Polymorphic `[name]_type` + `[name]_id` collapse to one line:
  `target - polymorphic record, [description] (Post, Comment)`
- Enums list their values in parentheses at the end of the line.
- Columns only — no `has_many` or other reverse associations.

This format describes the *shape* of the design. No column types, defaults,
nullability, constraints, or indexes — don't raise them unless asked.

## Example

```
posts
  author - record, who wrote it
  title
  body - markdown source
  status - publication state (draft, scheduled, published, archived)
  published_at - when status became published, blank until then

reactions
  user - record, who reacted
  target - polymorphic record, what was reacted to (Post, Comment, Photo)
  kind (like, celebrate, insightful)
```
