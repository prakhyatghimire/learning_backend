CREATE TABLE students(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age > 18)
);
INSERT INTO students (username, email, age) VALUES ('prakhyat', 'prakhyat@example.com', 28);
