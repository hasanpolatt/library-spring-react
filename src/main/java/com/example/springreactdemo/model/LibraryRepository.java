package com.example.springreactdemo.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Long> {
    Library findByName(String publisher);
}
