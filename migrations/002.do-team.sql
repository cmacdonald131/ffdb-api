CREATE TABLE ffdb_team (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES ffdb_users(id)
    ON DELETE SET NULL
);