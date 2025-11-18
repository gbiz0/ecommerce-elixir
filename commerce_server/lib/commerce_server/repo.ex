defmodule CommerceServer.Repo do
  use Ecto.Repo,
    otp_app: :commerce_server,
    adapter: Ecto.Adapters.Postgres
end
