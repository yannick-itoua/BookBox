package com.bookbox.controller;

import com.bookbox.model.Book;
import com.bookbox.dto.BookDTO;
import com.bookbox.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // Get all books
    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Get paginated books
    @GetMapping("/paged")
    public Page<BookDTO> getBooksPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return bookService.getBooksPaged(PageRequest.of(page, size));
    }

    // Get book by ID
    @GetMapping("/{id}")
    public BookDTO getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // Add a new book
    @PostMapping
    public BookDTO addBook(@RequestBody BookDTO bookDTO) {
        return bookService.addBook(bookDTO);
    }

    // Update a book
    @PutMapping("/{id}")
    public BookDTO updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        return bookService.updateBook(id, bookDTO);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    @GetMapping("/search")
    public List<Book> searchBooks(
        @RequestParam(required = false, defaultValue = "") String title,
        @RequestParam(required = false, defaultValue = "") String genre,
        @RequestParam(required = false, defaultValue = "") String author
    ) {
        return bookService.searchBooks(title, genre, author);
    }

    @PutMapping("/{bookId}/borrow")
    public BookDTO borrowBook(@PathVariable Long bookId, @RequestParam Long userId) {
        return bookService.borrowBook(bookId, userId);
    }

    @PutMapping("/{bookId}/return")
    public BookDTO returnBook(@PathVariable Long bookId) {
        return bookService.returnBook(bookId);
    }

    @GetMapping("/isbn/{isbn}")
    public BookDTO getBookByIsbn(@PathVariable String isbn) {
        BookDTO dto = bookService.getBookByIsbn(isbn);
        if (dto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        return dto;
    }
}
