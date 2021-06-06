
INSERT INTO department (id, name)
VALUES 
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, 'Sales Lead', 100000, 1),
    (2, 'Software Engineer', 120000, 2),
    (3, 'Accountant', 80000, 3),
    (4, 'Lawyer', 150000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, 'John', 'Doe', 1, 1),
    (2, 'Mike', 'Chan', 2, 1),
    (3, 'Tom', 'Allen', 3, 1),
    (4, 'Kevin', 'Brown', 4, 1);