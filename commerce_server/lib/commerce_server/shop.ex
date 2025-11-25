defmodule CommerceServer.Shop do
  @moduledoc """
  The Shop context.
  """

  import Ecto.Query, warn: false
  alias CommerceServer.Repo

  alias CommerceServer.Shop.Product
  alias CommerceServer.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any product changes.

  The broadcasted messages match the pattern:

    * {:created, %Product{}}
    * {:updated, %Product{}}
    * {:deleted, %Product{}}

  """
  def subscribe_products(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(CommerceServer.PubSub, "user:#{key}:products")
  end

  defp broadcast_product(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(CommerceServer.PubSub, "user:#{key}:products", message)
  end

  @doc """
  Returns the list of products.

  ## Examples

      iex> list_products(scope)
      [%Product{}, ...]

  """
  def list_products(%Scope{} = scope) do
    Repo.all_by(Product, user_id: scope.user.id)
  end

  @doc """
  Gets a single product.

  Raises `Ecto.NoResultsError` if the Product does not exist.

  ## Examples

      iex> get_product!(scope, 123)
      %Product{}

      iex> get_product!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_product!(%Scope{} = scope, id) do
    Repo.get_by!(Product, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a product.

  ## Examples

      iex> create_product(scope, %{field: value})
      {:ok, %Product{}}

      iex> create_product(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product(%Scope{} = scope, attrs) do
    with {:ok, product = %Product{}} <-
           %Product{}
           |> Product.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast_product(scope, {:created, product})
      {:ok, product}
    end
  end

  @doc """
  Updates a product.

  ## Examples

      iex> update_product(scope, product, %{field: new_value})
      {:ok, %Product{}}

      iex> update_product(scope, product, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_product(%Scope{} = scope, %Product{} = product, attrs) do
    true = product.user_id == scope.user.id

    with {:ok, product = %Product{}} <-
           product
           |> Product.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_product(scope, {:updated, product})
      {:ok, product}
    end
  end

  @doc """
  Deletes a product.

  ## Examples

      iex> delete_product(scope, product)
      {:ok, %Product{}}

      iex> delete_product(scope, product)
      {:error, %Ecto.Changeset{}}

  """
  def delete_product(%Scope{} = scope, %Product{} = product) do
    true = product.user_id == scope.user.id

    with {:ok, product = %Product{}} <-
           Repo.delete(product) do
      broadcast_product(scope, {:deleted, product})
      {:ok, product}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking product changes.

  ## Examples

      iex> change_product(scope, product)
      %Ecto.Changeset{data: %Product{}}

  """
  def change_product(%Scope{} = scope, %Product{} = product, attrs \\ %{}) do
    true = product.user_id == scope.user.id

    Product.changeset(product, attrs, scope)
  end

  alias CommerceServer.Shop.Order
  alias CommerceServer.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any order changes.

  The broadcasted messages match the pattern:

    * {:created, %Order{}}
    * {:updated, %Order{}}
    * {:deleted, %Order{}}

  """
  def subscribe_orders(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(CommerceServer.PubSub, "user:#{key}:orders")
  end

  defp broadcast_order(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(CommerceServer.PubSub, "user:#{key}:orders", message)
  end

  @doc """
  Returns the list of orders.

  ## Examples

      iex> list_orders(scope)
      [%Order{}, ...]

  """
  def list_orders(%Scope{} = scope) do
    Repo.all_by(Order, user_id: scope.user.id)
    |> Repo.preload(:products)
  end

  @doc """
  Gets a single order.

  Raises `Ecto.NoResultsError` if the Order does not exist.

  ## Examples

      iex> get_order!(scope, 123)
      %Order{}

      iex> get_order!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_order!(%Scope{} = scope, id) do
    Repo.get_by!(Order, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a order.

  ## Examples

      iex> create_order(scope, %{field: value})
      {:ok, %Order{}}

      iex> create_order(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_order(%Scope{} = scope, attrs, product_ids) do
    # Fetch the product structs based on IDs and ensuring they belong to the user (security)
    products =
      Repo.all(
        from(p in Product,
          where: p.id in ^product_ids and p.user_id == ^scope.user.id
        )
      )

    # Proceed only if we actually found products (Optional safety check)
    if products == [] do
      {:error, :no_products_found}
    else
      %Order{}
      |> Order.changeset(attrs, scope, products)
      |> Repo.insert()
      |> case do
        {:ok, order} ->
          broadcast_order(scope, {:created, order})
          {:ok, order}

        {:error, changeset} ->
          {:error, changeset}
      end
    end
  end

  @doc """
  Updates a order.

  ## Examples

      iex> update_order(scope, order, %{field: new_value})
      {:ok, %Order{}}

      iex> update_order(scope, order, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_order(%Scope{} = scope, %Order{} = order, attrs) do
    true = order.user_id == scope.user.id

    with {:ok, order = %Order{}} <-
           order
           |> Order.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_order(scope, {:updated, order})
      {:ok, order}
    end
  end

  @doc """
  Deletes a order.

  ## Examples

      iex> delete_order(scope, order)
      {:ok, %Order{}}

      iex> delete_order(scope, order)
      {:error, %Ecto.Changeset{}}

  """
  def delete_order(%Scope{} = scope, %Order{} = order) do
    true = order.user_id == scope.user.id

    with {:ok, order = %Order{}} <-
           Repo.delete(order) do
      broadcast_order(scope, {:deleted, order})
      {:ok, order}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking order changes.

  ## Examples

      iex> change_order(scope, order)
      %Ecto.Changeset{data: %Order{}}

  """
  def change_order(%Scope{} = scope, %Order{} = order, attrs \\ %{}) do
    true = order.user_id == scope.user.id

    Order.changeset(order, attrs, scope)
  end
end
