defmodule DemoWeb.PageController do
  use DemoWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def greeting(conn, %{"name" => "Borko"}) do
    send_resp(conn, 404, "Not found")
  end

  def greeting(conn, %{"name" => name}) do
    render(conn, "greeting.html", name: name)
  end
end
