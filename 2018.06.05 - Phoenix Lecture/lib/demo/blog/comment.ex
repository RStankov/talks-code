defmodule Demo.Blog.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "blog_comments" do
    field(:content, :string)
    field(:author, :string)

    belongs_to(:post, Demo.Blog.Post)

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:author, :content, :post_id])
    |> validate_required([:author, :content, :post_id])
    |> assoc_constraint(:post)
  end
end
