defmodule CommerceServerWeb.ProductController do
  use CommerceServerWeb, :controller

  alias CommerceServer.Shop
  alias CommerceServer.Shop.Product

  action_fallback CommerceServerWeb.FallbackController

  def index(conn, _params) do
    products = Shop.list_products(conn.assigns.current_scope)
    render(conn, :index, products: products)
  end

  def create(conn, %{"product" => product_params}) do
    with {:ok, %Product{} = product} <-
           Shop.create_product(conn.assigns.current_scope, product_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/products/#{product}")
      |> render(:show, product: product)
    end
  end

  def show(conn, %{"id" => id}) do
    product = Shop.get_product!(conn.assigns.current_scope, id)
    render(conn, :show, product: product)
  end

  def update(conn, %{"id" => id, "product" => product_params}) do
    product = Shop.get_product!(conn.assigns.current_scope, id)

    with {:ok, %Product{} = product} <-
           Shop.update_product(conn.assigns.current_scope, product, product_params) do
      render(conn, :show, product: product)
    end
  end

  def delete(conn, %{"id" => id}) do
    product = Shop.get_product!(conn.assigns.current_scope, id)

    with {:ok, %Product{}} <- Shop.delete_product(conn.assigns.current_scope, product) do
      send_resp(conn, :no_content, "")
    end
  end
end
