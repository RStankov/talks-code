# Ruby

- Overuse of `before` / `let` in tests
- `create` / `update` instead of `create!` / `update!` — silent failure on validation errors.
- New query with a potential N+1.
- Use `inverse_of` when setting ActiveRecord relationships
- Model method only one caller needs (only during creation, only from one form) — code in the model should be code the model widely uses.
- Service object (`module extend self` with `call`) added without a spec.
- Request params handled outside the form object that already exists for this area — hand-rolled `*_params` next to a form object that takes `params` directly.
- Concern or extension extracted before the behaviour is actually duplicated across more than one model.
- Bare top-level class that belongs under a feature namespace (`Buildings::Template`, not `BuildingTemplate`).
- Model depending on a form while the form depends on the model — circular dependency between layers.
- Uniqueness validation not scoped to the column it belongs to (`scope: :account_id` rather than global).
- Slow or high-volume work (many rows, external API calls, file processing) running inline instead of in a background job, or a job that leaves partial state when it fails midway.
