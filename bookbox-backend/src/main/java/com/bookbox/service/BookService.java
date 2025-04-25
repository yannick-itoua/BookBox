package com.bookbox.service;

import com.bookbox.model.Book;
import com.bookbox.dto.BookDTO;
import com.bookbox.repository.BookRepository;
import com.bookbox.repository.UserRepository;
import com.bookbox.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    // Convert Book to BookDTO
    private BookDTO toDTO(Book book) {
        if (book == null) return null;
        return new BookDTO(
            book.getId(),
            book.getTitle(),
            book.getAuthor(),
            book.getDescription(),
            book.getGenre(),
            book.isAvailable(),
            book.getCoverUrl(),
            book.getOwner() != null ? book.getOwner().getId() : null,
            book.getBorrower() != null ? book.getBorrower().getId() : null
        );
    }

    // Convert BookDTO to Book
    private Book toEntity(BookDTO dto) {
        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setDescription(dto.getDescription());
        book.setGenre(dto.getGenre());
        book.setAvailable(dto.isAvailable());
        book.setCoverUrl(dto.getCoverUrl());
        if (dto.getOwnerId() != null) {
            Optional<User> owner = userRepository.findById(dto.getOwnerId());
            owner.ifPresent(book::setOwner);
        }
        if (dto.getBorrowerId() != null) {
            Optional<User> borrower = userRepository.findById(dto.getBorrowerId());
            borrower.ifPresent(book::setBorrower);
        }
        return book;
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Pagination support
    public Page<BookDTO> getBooksPaged(Pageable pageable) {
        return bookRepository.findAll(pageable).map(this::toDTO);
    }

    public BookDTO getBookById(Long id) {
        return bookRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public BookDTO addBook(BookDTO bookDTO) {
        Book book = toEntity(bookDTO);
        Book saved = bookRepository.save(book);
        return toDTO(saved);
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        return bookRepository.findById(id).map(existing -> {
            existing.setTitle(bookDTO.getTitle());
            existing.setAuthor(bookDTO.getAuthor());
            existing.setDescription(bookDTO.getDescription());
            existing.setGenre(bookDTO.getGenre());
            existing.setAvailable(bookDTO.isAvailable());
            existing.setCoverUrl(bookDTO.getCoverUrl());
            if (bookDTO.getOwnerId() != null) {
                userRepository.findById(bookDTO.getOwnerId()).ifPresent(existing::setOwner);
            }
            if (bookDTO.getBorrowerId() != null) {
                userRepository.findById(bookDTO.getBorrowerId()).ifPresent(existing::setBorrower);
            }
            Book updated = bookRepository.save(existing);
            return toDTO(updated);
        }).orElse(null);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
