# 🛒💜 E-Commerce CRUD Project

Este projeto é uma implementação de um sistema básico de E-Commerce com operações **CRUD** (Create, Read, Update, Delete), utilizando **Elixir** no backend para performance e confiabilidade, e **Next.js** no frontend para uma experiência de usuário moderna e reativa.

## 👥 Equipe

| Nome | Função Principal |
| :--- | :--- |
| **Gustavo Bizo** | Banco de Dados |
| **Guilherme Grigolin** | Desenvolvedor Frontend |
| **Ravi Vendramini** | Líder Desenvolvedor Backend |

## 👨‍🏫 Orientação

**Professor Dr. Evandro de Araújo Jardini**

---

## 🚀 Stack Tecnológica

O projeto utiliza uma combinação de tecnologias modernas para garantir **escalabilidade**, **performance** e **manutenibilidade**.

### Backend

* **Elixir:** Linguagem de programação funcional, rodando na Máquina Virtual Erlang (BEAM).
* **Phoenix Framework:** Framework web de alto desempenho para Elixir (para a API).
* **Ecto:** Biblioteca de mapeamento objeto-relacional (ORM) para o banco de dados.
* **PostgreSQL:** Banco de dados relacional robusto.

### Frontend

* **Next.js (React Framework):** Para desenvolvimento frontend moderno e otimizado.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida.
* **Axios / Fetch API:** Para comunicação com a API backend (Elixir/Phoenix).

---

## 🗺️ Arquitetura do Banco de Dados

O banco de dados relacional modela as entidades principais de um sistema de E-commerce.

### 📝 Esquema (DBML/SQL)

```sql
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

### ⚙️ Rodando o Projeto


##### Backend
```sh
    cd commerce_server
    docker compose up --build
    docker compose exec app mix ecto.setup # Necesário apenas a primeira vez que o projeto é iniciado (Cria as tabelas no banco)
```
