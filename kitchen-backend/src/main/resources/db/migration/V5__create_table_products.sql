CREATE TABLE products
(
    product_id         SERIAL PRIMARY KEY,
    product_name       VARCHAR(50)  NOT NULL,
    product_price      DECIMAL      NOT NULL,
    product_image      VARCHAR(255) NOT NULL,
    product_components VARCHAR(255) NOT NULL,
    product_category   INT          NOT NULL
);