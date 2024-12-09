-- Creazione tabella prodotti
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2)
);

-- Creazione tabella utenti
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Creazione tabella ordini
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    total_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella di giunzione per ordini e prodotti
CREATE TABLE order_products (
    order_id VARCHAR(36),
    product_id VARCHAR(36),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabella di giunzione per ordini e utenti
CREATE TABLE order_users (
    order_id VARCHAR(36),
    user_id VARCHAR(36),
    PRIMARY KEY (order_id, user_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);