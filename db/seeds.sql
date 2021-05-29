INSERT INTO departments (name) 
VALUES
    ('HR'),
    ('Accounting'),
    ('IT'),
    ('Management'),
    ('Programming');

INSERT INTO roles (title, salary, department_id)
VALUES  
    ('Accountant', 60000, 2),
    ('Web Developer', 100000, 5),
    ('HR Rep', 50000, 1),
    ('IT Tech', 80000, 3),
    ('Manager', 65000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Charlie', 'Green', 1, NULL),
    ('Heather', 'McSweeney', 2, NULL),
    ('Jimbo', 'Green', 3, NULL),
    ('Darla', 'Chaney', 4, 1),
    ('Greg', 'Carlson', 5, 2),
    ('Shiela', 'Oz', 2, 2);