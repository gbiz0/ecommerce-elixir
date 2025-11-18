defmodule CommerceServer.Shop.Order do
  use Ecto.Schema
  import Ecto.Changeset

  schema "orders" do
    field :description, :string
    field :user_id, :id

    many_to_many :products, CommerceServer.Shop.Product, join_through: "order_items"

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(order, attrs, user_scope) do
    order
    |> cast(attrs, [:description])
    |> put_change(:user_id, user_scope.user.id)
  end
end
