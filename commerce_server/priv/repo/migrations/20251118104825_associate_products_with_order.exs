defmodule CommerceServer.Repo.Migrations.AssociateProductsWithOrder do
  use Ecto.Migration

  def change do
    create table(:order_items, primary_key: true) do
      add :product_id, references(:products, on_delete: :delete_all), null: false
      add :order_id, references(:orders, on_delete: :delete_all), null: false
      add :quantity, :integer, default: 1
    end
  end
end
