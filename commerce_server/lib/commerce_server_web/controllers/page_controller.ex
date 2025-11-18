defmodule CommerceServerWeb.PageController do
  use CommerceServerWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
