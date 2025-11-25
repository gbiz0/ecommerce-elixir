defmodule CommerceServerWeb.OrderJSON do
  alias CommerceServer.Shop.Order
  alias CommerceServerWeb.ProductJSON

  @doc """
  Renders a list of orders.
  """
  def index(%{orders: orders}) do
    %{data: for(order <- orders, do: data(order))}
  end

  @doc """
  Renders a single order.
  """
  def show(%{order: order}) do
    %{data: data(order)}
  end

  defp data(%Order{} = order) do
    %{
      id: order.id,
      description: order.description,
      # We add the products association here
      products: render_products(order.products)
    }
  end

  # SAFETY HELPERS:
  # 1. If products weren't preloaded (Ecto.Association.NotLoaded), return an empty list or nil.
  defp render_products(%Ecto.Association.NotLoaded{}), do: []

  # 2. If products are loaded (it's a list), map over them using the ProductJSON module.
  defp render_products(products) when is_list(products) do
    for product <- products, do: ProductJSON.data(product)
  end

  # 3. Fallback for nil or unexpected data
  defp render_products(_), do: []
end
