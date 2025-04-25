-- Insert sample users
INSERT INTO users (id, username, email, password) VALUES (1, 'alice', 'alice@example.com', 'password1');
INSERT INTO users (id, username, email, password) VALUES (2, 'bob', 'bob@example.com', 'password2');

-- Insert sample books
INSERT INTO books (id, title, author, description, genre, available, cover_url, owner_id, borrower_id) VALUES
(1, 'The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel', 'Fantasy', true, NULL, 1, NULL),
(2, '1984', 'George Orwell', 'Dystopian classic', 'Dystopian', true, NULL, 2, NULL),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'Classic novel', 'Fiction', false, NULL, 1, 2);