CREATE TABLE reservations
(
    reservation_id     SERIAL PRIMARY KEY,
    desk_id            INT          NOT NULL,
    user_id            VARCHAR(255) NOT NULL,
    event_description  VARCHAR(255),
    reservation_places INT          NOT NULL,
    reservation_date   TIMESTAMP    NOT NULL,
    CONSTRAINT fk_reservation_userId FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_reservation_deskId FOREIGN KEY (desk_id) REFERENCES desks (desk_id)
);