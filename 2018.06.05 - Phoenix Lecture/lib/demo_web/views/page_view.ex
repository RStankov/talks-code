defmodule DemoWeb.PageView do
  use DemoWeb, :view

  def greeting(name) do
    content_tag(:h3, "Hi, #{name} 😎", class: "big-red")
  end
end
