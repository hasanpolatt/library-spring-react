package com.example.springreactdemo.controller;

import com.example.springreactdemo.model.Library;
import com.example.springreactdemo.model.LibraryRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LibraryController {

    private final Logger log = LoggerFactory.getLogger(LibraryController.class);
    private LibraryRepository libraryRepository;

    public LibraryController(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @GetMapping("/books")
    Collection<Library> library() {
        return libraryRepository.findAll();
    }

    @GetMapping("/book/{id}")
    ResponseEntity<?> getLibrary(@PathVariable Long id) {
        Optional<Library> library = libraryRepository.findById(id);
        return library.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/book")
    ResponseEntity<Library> createdLibrary(@Valid @RequestBody Library library) throws URISyntaxException {
        log.info("for create library: {}", library);
        Library result = libraryRepository.save(library);
        return ResponseEntity.created(new URI("/api/library" + result.getId())).body(result);
    }

    @PutMapping("/library/{id}")
    ResponseEntity<Library> updateLibrary(@Valid @RequestBody Library library) {
        log.info("for update library", library);
        Library result = libraryRepository.save(library);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/library/{id}")
    public ResponseEntity<?> deleteLibrary(@PathVariable Long id) {
        log.info("for delete library", id);
        libraryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
