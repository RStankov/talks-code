PostType = GraphQL::ObjectType.define do
  name 'Post'
  description 'The post'

  field :id, types.Int
  field :title, types.String, 'Title of the post'
  field :tagline, types.String, 'Tagline of the post'
  field :votes_count, types.Int, 'Number of votes for post'
  field :comments_count, types.Int, 'Number of comments for post'
  field :thumbnail_url, types.String, 'Url of post thumbnail'

  field :hunter do
    type -> { UserType }
    description 'Hunter of the post'

    resolve -> (obj, args, context) do
      obj.user
    end
  end

  field :makers do
    type -> { types[UserType] }
    description 'Makers of the post'

    resolve -> (obj, args, context) do
      obj.makers
    end
  end
end

