package com.bookbox.repository;

import com.bookbox.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByGenreContainingIgnoreCase(String genre);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    // Optional: combine filters
    List<Book> findByTitleContainingIgnoreCaseAndGenreContainingIgnoreCaseAndAuthorContainingIgnoreCase(
        String title, String genre, String author
    );
}
