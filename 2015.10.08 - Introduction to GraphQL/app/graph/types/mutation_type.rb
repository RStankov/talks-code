MutationType = GraphQL::ObjectType.define do
  name 'Mutation query'
  description 'The query root for this schema'

  field :createUser do
    type -> { !UserType }
    description 'Create user'

    argument :name, types.String, 'User name'
    argument :handle, types.String, 'User handle'

    resolve -> (obj, args, context) do
      User.create! name: args['name'], handle: args['handle']
    end
  end

  field :updateUser do
    type -> { !UserType }
    description 'Update user'

    argument :id, types.Int, 'User id'
    argument :name, types.String, 'User name'
    argument :handle, types.String, 'User handle'

    resolve -> (obj, args, context) do
      user = User.find(args['id'])
      user.update! name: args['name'], handle: args['handle']
      user
    end
  end
end

