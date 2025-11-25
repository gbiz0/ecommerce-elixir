defmodule CommerceServerWeb.ProductJSON do
  alias CommerceServer.Shop.Product

  @doc """
  Renders a list of products.
  """
  def index(%{products: products}) do
    %{data: for(product <- products, do: data(product))}
  end

  @doc """
  Renders a single product.
  """
  def show(%{product: product}) do
    %{data: data(product)}
  end

  def data(%Product{} = product) do
    %{
      id: product.id,
      title: product.title,
      description: product.description
    }
  end
end
