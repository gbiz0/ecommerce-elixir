defmodule CommerceServerWeb.AuthController do
  use CommerceServerWeb, :controller

  alias CommerceServer.Accounts

  def register(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, _user} ->
        {:ok, _} =
          json(conn, %{message: "User registered successfully"})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(CommerceServerWeb.ChangesetJSON.error(%{changeset: changeset}))
    end
  end

  def login(conn, %{"user" => user_params}) do
    if user =
         Accounts.get_user_by_email_and_password(user_params["email"], user_params["password"]) do
      conn
      |> put_status(:ok)
      |> json(%{message: "Logged in successfully", token: Accounts.create_user_api_token(user)})
    end

    conn
    |> put_status(:unauthorized)
    |> json(%{error: %{message: "Invalid email or password"}})
  end
end
