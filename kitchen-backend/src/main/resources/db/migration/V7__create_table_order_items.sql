CREATE TABLE order_items
(
    item_id            SERIAL PRIMARY KEY,
    item_status        VARCHAR(50) NOT NULL,
    item_specification VARCHAR(255),
    item_amount        INT         NOT NULL,
    item_price         DECIMAL     NOT NULL,
    desk_id            INT         NOT NULL,
    product_id         INT         NOT NULL,
    CONSTRAINT fk_item_deskId FOREIGN KEY (desk_id) REFERENCES desks (desk_id),
    CONSTRAINT fk_item_productId FOREIGN KEY (product_id) REFERENCES products (product_id)
);