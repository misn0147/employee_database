INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Software Engineer', 120000, 2),
    ('Accountant', 80000, 3),
    ('Lawyer', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, 1),
    ('Mike', 'Chan', 2, 1),
    ('Tom', 'Allen', 3, 1),
    ('Kevin', 'Brown', 4, 1);