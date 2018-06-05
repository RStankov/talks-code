defmodule Demo.Blog do
  import Ecto.Query, warn: false
  alias Demo.Repo

  alias Demo.Blog.Post
  alias Demo.Blog.Comment

  def list_posts do
    Repo.all(Post)
  end

  def get_post!(id) do
    Post
    |> Repo.get!(id)
    |> Repo.preload(comments: from(c in Comment, order_by: c.id))
  end

  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  def change_post(%Post{} = post) do
    Post.changeset(post, %{})
  end

  def insert_comment(post_id, params) do
    %Comment{post_id: post_id}
    |> Comment.changeset(params)
    |> Repo.insert()
  end
end
