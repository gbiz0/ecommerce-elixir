defmodule CommerceServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CommerceServerWeb.Telemetry,
      CommerceServer.Repo,
      {DNSCluster, query: Application.get_env(:commerce_server, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CommerceServer.PubSub},
      # Start a worker by calling: CommerceServer.Worker.start_link(arg)
      # {CommerceServer.Worker, arg},
      # Start to serve requests, typically the last entry
      CommerceServerWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CommerceServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CommerceServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
