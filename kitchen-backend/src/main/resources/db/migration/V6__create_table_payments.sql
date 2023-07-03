CREATE TABLE payments
(
    payment_id     SERIAL PRIMARY KEY,
    payment_date   TIMESTAMP    NOT NULL,
    payment_amount DECIMAL      NOT NULL,
    desk_id        INT          NOT NULL,
    user_id        VARCHAR(255) NOT NULL,
    CONSTRAINT fk_payment_deskId FOREIGN KEY (desk_id) REFERENCES desks (desk_id),
    CONSTRAINT fk_payment_userId FOREIGN KEY (user_id) REFERENCES users (user_id)
);