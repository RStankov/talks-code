# GraphQL

- Mutation with no authorization check
- Required arguments not marked as non-null
- Error states not handled — mutation succeeds silently on partial failure
- N+1: resolver loads association in a loop without batching
- Mutation name doesn't follow verb-noun convention (`CreateOrder`, not `OrderCreate`)
- No test for mutation or resolver
- Resolver containing business logic that belongs in a model/service
- Type field names inconsistent with schema conventions
- Flag schema changes that can break existing clients
