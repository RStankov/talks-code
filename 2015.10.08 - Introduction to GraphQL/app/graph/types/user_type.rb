UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'The user'

  field :id, types.Int
  field :name, types.String, 'Name of the user'
  field :handle, types.String, 'Handle of the user'
  field :avatar_url, types.String, 'Url of user avatar'

  field :posts do
    type -> { types[PostType] }
    description 'Posts of the user'

    resolve -> (obj, args, context) do
      obj.posts
    end
  end
end
