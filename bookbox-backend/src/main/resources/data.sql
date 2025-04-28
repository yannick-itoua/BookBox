-- Insert sample users
INSERT INTO users (username, email, password) VALUES ('alice', 'alice@example.com', 'password1');
INSERT INTO users (username, email, password) VALUES ('bob', 'bob@example.com', 'password2');

-- Insert sample books
INSERT INTO books (id, title, author, description, genre, available, cover_url, isbn, owner_id, borrower_id) VALUES
(1, 'The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel', 'Fantasy', true, NULL, '9780547928227', 1, NULL),
(2, '1984', 'George Orwell', 'Dystopian classic', 'Dystopian', true, NULL, '9780451524935', 2, NULL),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'Classic novel', 'Fiction', false, NULL, '9780061120084', 1, 2),
(4, 'Pride and Prejudice', 'Jane Austen', 'Romantic novel', 'Romance', true, NULL, '9780141439518', 2, NULL),
(5, 'The Great Gatsby', 'F. Scott Fitzgerald', 'American classic', 'Classic', true, NULL, '9780743273565', 1, NULL),
(6, 'Moby Dick', 'Herman Melville', 'Adventure at sea', 'Adventure', false, NULL, '9781503280786', 2, 1),
(7, 'War and Peace', 'Leo Tolstoy', 'Epic historical novel', 'Historical', true, NULL, '9780199232765', 1, NULL),
(8, 'The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age story', 'Fiction', true, NULL, '9780316769488', 2, NULL),
(9, 'Brave New World', 'Aldous Huxley', 'Dystopian future', 'Dystopian', true, NULL, '9780060850524', 1, NULL),
(10, 'The Lord of the Rings', 'J.R.R. Tolkien', 'Epic fantasy trilogy', 'Fantasy', false, NULL, '9780544003415', 2, 1),
(11, 'Jane Eyre', 'Charlotte Brontë', 'Gothic novel', 'Classic', true, NULL, '9780142437209', 1, NULL),
(12, 'Crime and Punishment', 'Fyodor Dostoevsky', 'Psychological drama', 'Classic', true, NULL, '9780140449136', 2, NULL),
(13, 'The Alchemist', 'Paulo Coelho', 'Philosophical novel', 'Adventure', true, NULL, '9780061122415', 1, NULL),
(14, 'Animal Farm', 'George Orwell', 'Political satire', 'Satire', false, NULL, '9780451526342', 2, 1),
(15, 'Wuthering Heights', 'Emily Brontë', 'Tragic romance', 'Romance', true, NULL, '9780141439556', 1, NULL),
(16, 'The Odyssey', 'Homer', 'Ancient Greek epic', 'Epic', true, NULL, '9780140268867', 2, NULL),
(17, 'Don Quixote', 'Miguel de Cervantes', 'Spanish classic', 'Classic', true, NULL, '9780060934346', 1, NULL),
(18, 'Frankenstein', 'Mary Shelley', 'Science fiction classic', 'Science Fiction', true, NULL, '9780141439471', 2, NULL),
(19, 'Dracula', 'Bram Stoker', 'Gothic horror', 'Horror', true, NULL, '9780141439846', 1, NULL),
(20, 'The Picture of Dorian Gray', 'Oscar Wilde', 'Philosophical fiction', 'Classic', true, NULL, '9780141439570', 2, NULL);