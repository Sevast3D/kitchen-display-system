CREATE TABLE users
(
    user_id       VARCHAR(255) PRIMARY KEY,
    first_name    VARCHAR(50)         NOT NULL,
    last_name     VARCHAR(50)         NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    phone_number  VARCHAR(50)         NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    profile_image VARCHAR(255),
    role          VARCHAR(50)         NOT NULL
);