package com.example.springreactdemo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "book_collection")
public class Library {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;

    private String publisher;

    @ManyToOne(cascade=CascadeType.PERSIST)
    private Book book;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Event> events;

}
