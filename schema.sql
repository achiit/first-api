CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO notes (title, content)
VALUES 
('First note', 'This is the first note'),
('Second note', "This is the second note");
