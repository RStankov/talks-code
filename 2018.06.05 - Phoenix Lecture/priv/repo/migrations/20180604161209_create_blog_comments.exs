defmodule Demo.Repo.Migrations.CreateBlogComments do
  use Ecto.Migration

  def change do
    create table(:blog_comments) do
      add :author, :string
      add :content, :text
      add :post_id, references(:posts, on_delete: :nothing)

      timestamps()
    end

    create index(:blog_comments, [:post_id])
  end
end
