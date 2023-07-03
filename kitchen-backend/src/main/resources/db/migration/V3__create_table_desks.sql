CREATE TABLE desks
(
    desk_id        SERIAL PRIMARY KEY,
    desk_number    INT         NOT NULL,
    places         INT         NOT NULL,
    desk_status    VARCHAR(50) NOT NULL,
    cooking_status VARCHAR(50) NOT NULL
);