CREATE TABLE tokens(
    token_id VARCHAR PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_time DATE NOT NULL,
    expiration_time DATE NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)
);