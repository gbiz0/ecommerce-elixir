# ecommerce-elixir
just crud in elixir

Diagram DB Schema
```
Table users {
  id integer [primary key]
  username text
  email text
  bio_info integer
  created_at timestamp
  updated_at timestamp
}

Table products {
  id integer [primary key]
  title varchar
  description varchar
  created_at timestamp
  updated_at timestamp  
}

Table orders {
  id integer [primary key]
  user_id integer [ref: > users.id]
  created_at timestamp
  updated_at timestamp  
}


Ref order_items: orders.id <> products.id
```


