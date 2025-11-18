defmodule CommerceServerWeb.OrderController do
  use CommerceServerWeb, :controller

  alias CommerceServer.Shop
  alias CommerceServer.Shop.Order

  action_fallback CommerceServerWeb.FallbackController

  def index(conn, _params) do
    orders = Shop.list_orders(conn.assigns.current_scope)
    render(conn, :index, orders: orders)
  end

  def create(conn, %{"order" => order_params}) do
    with {:ok, %Order{} = order} <- Shop.create_order(conn.assigns.current_scope, order_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/orders/#{order}")
      |> render(:show, order: order)
    end
  end

  def show(conn, %{"id" => id}) do
    order = Shop.get_order!(conn.assigns.current_scope, id)
    render(conn, :show, order: order)
  end

  def update(conn, %{"id" => id, "order" => order_params}) do
    order = Shop.get_order!(conn.assigns.current_scope, id)

    with {:ok, %Order{} = order} <-
           Shop.update_order(conn.assigns.current_scope, order, order_params) do
      render(conn, :show, order: order)
    end
  end

  def delete(conn, %{"id" => id}) do
    order = Shop.get_order!(conn.assigns.current_scope, id)

    with {:ok, %Order{}} <- Shop.delete_order(conn.assigns.current_scope, order) do
      send_resp(conn, :no_content, "")
    end
  end
end
