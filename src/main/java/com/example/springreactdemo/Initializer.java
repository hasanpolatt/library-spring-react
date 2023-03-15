package com.example.springreactdemo;

import com.example.springreactdemo.model.Event;
import com.example.springreactdemo.model.Library;
import com.example.springreactdemo.model.LibraryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final LibraryRepository repository;

    public Initializer(LibraryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("İthaki", "Timaş", "Kronik", "Metis").forEach(name ->
                repository.save(new Library(name))
        );

        Library publishers = repository.findByName("İthaki");
        Event e = Event.builder().title("Cesur Yeni Dünya")
                .description("A book about dystopia.")
                .date(Instant.parse("2023-03-15T17:00:00.000Z"))
                .build();
        publishers.setEvents(Collections.singleton(e));
        repository.save(publishers);

        repository.findAll().forEach(System.out::println);
    }
}
