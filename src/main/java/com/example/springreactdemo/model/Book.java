package com.example.springreactdemo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "books")
public class Book {
    @Id
    private String id;
    private String name;
    private String author;
    private String translator;
    private String editor;
    private String serialNumber;
}
