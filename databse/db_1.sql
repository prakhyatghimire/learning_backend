CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(50)
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    movie_id INT REFERENCES movies(id),
    rating INT
);
