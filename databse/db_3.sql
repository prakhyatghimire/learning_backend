CREATE TABLE stud(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INTEGER CHECK(age>=18)
);
INSERT INTO stud(name,email,age) VALUES('prakhya','prakhyt123@gmail.com',19),
('shyman','shym@123gmail.com',20),
('shymcn','sh@123gmail.com',31),
('ram','ram@gmail.com',56),('hari','hari@gmail.com',45);

SELECT name,age FROM stud WHERE age>30 ORDER BY age DESC;
CREATE TABLE courses(
    course_id BIGSERIAL PRIMARY KEY,
    course_name TEXT UNIQUE,
)