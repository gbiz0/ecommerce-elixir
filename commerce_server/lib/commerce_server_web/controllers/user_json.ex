defmodule CommerceServerWeb.UserJSON do
  alias CommerceServer.Accounts.User

  @doc """
  Renders a list of users.
  """
  def index(%{users: users}) do
    %{data: for(user <- users, do: data(user))}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      email: user.email,
      confirmed_at: user.confirmed_at
    }
  end
end
