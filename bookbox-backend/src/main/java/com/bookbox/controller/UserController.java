package com.bookbox.controller;

import com.bookbox.model.User;
import com.bookbox.service.UserService;
import com.bookbox.model.Book;
import com.bookbox.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookRepository bookRepository;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Add a new user
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // Update a user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            user.setPassword(null); // Hide password in response
        }
        return user;
    }

    // Get books owned by a user
    @GetMapping("/{id}/books")
    public List<Book> getBooksByOwner(@PathVariable Long id) {
        return bookRepository.findByOwnerId(id);
    }

    // Get books borrowed by a user
    @GetMapping("/{id}/borrowed-books")
    public List<Book> getBorrowedBooks(@PathVariable Long id) {
        return bookRepository.findByBorrowerId(id);
    }
}
