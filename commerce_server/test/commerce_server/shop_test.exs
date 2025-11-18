defmodule CommerceServer.ShopTest do
  use CommerceServer.DataCase

  alias CommerceServer.Shop

  describe "products" do
    alias CommerceServer.Shop.Product

    import CommerceServer.AccountsFixtures, only: [user_scope_fixture: 0]
    import CommerceServer.ShopFixtures

    @invalid_attrs %{description: nil, title: nil}

    test "list_products/1 returns all scoped products" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      product = product_fixture(scope)
      other_product = product_fixture(other_scope)
      assert Shop.list_products(scope) == [product]
      assert Shop.list_products(other_scope) == [other_product]
    end

    test "get_product!/2 returns the product with given id" do
      scope = user_scope_fixture()
      product = product_fixture(scope)
      other_scope = user_scope_fixture()
      assert Shop.get_product!(scope, product.id) == product
      assert_raise Ecto.NoResultsError, fn -> Shop.get_product!(other_scope, product.id) end
    end

    test "create_product/2 with valid data creates a product" do
      valid_attrs = %{description: "some description", title: "some title"}
      scope = user_scope_fixture()

      assert {:ok, %Product{} = product} = Shop.create_product(scope, valid_attrs)
      assert product.description == "some description"
      assert product.title == "some title"
      assert product.user_id == scope.user.id
    end

    test "create_product/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Shop.create_product(scope, @invalid_attrs)
    end

    test "update_product/3 with valid data updates the product" do
      scope = user_scope_fixture()
      product = product_fixture(scope)
      update_attrs = %{description: "some updated description", title: "some updated title"}

      assert {:ok, %Product{} = product} = Shop.update_product(scope, product, update_attrs)
      assert product.description == "some updated description"
      assert product.title == "some updated title"
    end

    test "update_product/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      product = product_fixture(scope)

      assert_raise MatchError, fn ->
        Shop.update_product(other_scope, product, %{})
      end
    end

    test "update_product/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      product = product_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = Shop.update_product(scope, product, @invalid_attrs)
      assert product == Shop.get_product!(scope, product.id)
    end

    test "delete_product/2 deletes the product" do
      scope = user_scope_fixture()
      product = product_fixture(scope)
      assert {:ok, %Product{}} = Shop.delete_product(scope, product)
      assert_raise Ecto.NoResultsError, fn -> Shop.get_product!(scope, product.id) end
    end

    test "delete_product/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      product = product_fixture(scope)
      assert_raise MatchError, fn -> Shop.delete_product(other_scope, product) end
    end

    test "change_product/2 returns a product changeset" do
      scope = user_scope_fixture()
      product = product_fixture(scope)
      assert %Ecto.Changeset{} = Shop.change_product(scope, product)
    end
  end

  describe "orders" do
    alias CommerceServer.Shop.Order

    import CommerceServer.AccountsFixtures, only: [user_scope_fixture: 0]
    import CommerceServer.ShopFixtures

    @invalid_attrs %{description: nil}

    test "list_orders/1 returns all scoped orders" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      order = order_fixture(scope)
      other_order = order_fixture(other_scope)
      assert Shop.list_orders(scope) == [order]
      assert Shop.list_orders(other_scope) == [other_order]
    end

    test "get_order!/2 returns the order with given id" do
      scope = user_scope_fixture()
      order = order_fixture(scope)
      other_scope = user_scope_fixture()
      assert Shop.get_order!(scope, order.id) == order
      assert_raise Ecto.NoResultsError, fn -> Shop.get_order!(other_scope, order.id) end
    end

    test "create_order/2 with valid data creates a order" do
      valid_attrs = %{description: "some description"}
      scope = user_scope_fixture()

      assert {:ok, %Order{} = order} = Shop.create_order(scope, valid_attrs)
      assert order.description == "some description"
      assert order.user_id == scope.user.id
    end

    test "create_order/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Shop.create_order(scope, @invalid_attrs)
    end

    test "update_order/3 with valid data updates the order" do
      scope = user_scope_fixture()
      order = order_fixture(scope)
      update_attrs = %{description: "some updated description"}

      assert {:ok, %Order{} = order} = Shop.update_order(scope, order, update_attrs)
      assert order.description == "some updated description"
    end

    test "update_order/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      order = order_fixture(scope)

      assert_raise MatchError, fn ->
        Shop.update_order(other_scope, order, %{})
      end
    end

    test "update_order/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      order = order_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = Shop.update_order(scope, order, @invalid_attrs)
      assert order == Shop.get_order!(scope, order.id)
    end

    test "delete_order/2 deletes the order" do
      scope = user_scope_fixture()
      order = order_fixture(scope)
      assert {:ok, %Order{}} = Shop.delete_order(scope, order)
      assert_raise Ecto.NoResultsError, fn -> Shop.get_order!(scope, order.id) end
    end

    test "delete_order/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      order = order_fixture(scope)
      assert_raise MatchError, fn -> Shop.delete_order(other_scope, order) end
    end

    test "change_order/2 returns a order changeset" do
      scope = user_scope_fixture()
      order = order_fixture(scope)
      assert %Ecto.Changeset{} = Shop.change_order(scope, order)
    end
  end
end
