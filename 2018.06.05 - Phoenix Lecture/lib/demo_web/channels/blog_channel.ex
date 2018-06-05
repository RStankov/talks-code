defmodule DemoWeb.BlogChannel do
  use DemoWeb, :channel

  def join("blog:comments:" <> post_id, payload, socket) do
    if authorized?(payload) do
      {:ok, socket |> assign(:post_id, post_id)}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (blog:comments).
  def handle_in("new-comment", payload, socket) do
    # Demo.Blog.insert_comment(socket.assigns[:post_id], payload)
    Demo.Blog.insert_comment(1, payload)
    broadcast(socket, "new-comment", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
