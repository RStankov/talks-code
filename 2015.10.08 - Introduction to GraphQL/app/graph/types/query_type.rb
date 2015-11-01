QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root for this schema'

  field :user do
    type -> { !UserType }
    description 'The user'

    argument :id, types.Int, 'User id'

    resolve -> (obj, args, context) do
      User.find_by_id args['id']
    end
  end

  field :users do
    type -> { types[!UserType] }
    description 'The users'

    resolve -> (obj, args, context) do
      User.all
    end
  end

  field :post do
    type -> { !PostType }
    description 'The post'

    argument :id, types.Int, 'Post id'

    resolve -> (obj, args, context) do
      Post.find_by_id args['id']
    end
  end

  field :posts do
    type -> { types[!PostType] }
    description 'The posts'

    resolve -> (obj, args, context) do
      Post.all
    end
  end
end
