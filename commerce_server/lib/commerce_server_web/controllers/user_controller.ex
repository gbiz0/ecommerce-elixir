defmodule CommerceServerWeb.UserController do
  use CommerceServerWeb, :controller

  alias CommerceServer.Accounts

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, :index, users: users)
  end
end
