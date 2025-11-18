defmodule CommerceServer.Shop.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :title, :string
    field :description, :string
    field :user_id, :id

    many_to_many :orders, CommerceServer.Shop.Order, join_through: "order_items"

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(product, attrs, user_scope) do
    product
    |> cast(attrs, [:title, :description])
    |> validate_required([:title, :description])
    |> put_change(:user_id, user_scope.user.id)
  end
end
