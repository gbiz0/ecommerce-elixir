defmodule CommerceServer.ShopFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CommerceServer.Shop` context.
  """

  @doc """
  Generate a product.
  """
  def product_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        description: "some description",
        title: "some title"
      })

    {:ok, product} = CommerceServer.Shop.create_product(scope, attrs)
    product
  end

  @doc """
  Generate a order.
  """
  def order_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        description: "some description"
      })

    {:ok, order} = CommerceServer.Shop.create_order(scope, attrs)
    order
  end
end
