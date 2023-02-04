package com.example.cardatabase.domain;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
@DataJpaTest
@AutoConfigureTestDatabase(replace =Replace.NONE)
class OwnerRepositoryTest {

    @Autowired
    private OwnerRepository repository;

    @Test
    void saveOwner(){
        repository.save(new Owner("Lucy", "Smith"));
        assertThat(repository.findByFirstname("Lucy").isPresent()).isTrue();
    }

    @Test
    void deleteOwners(){
        repository.save(new Owner("Lisa", "Morrison"));
        repository.deleteAll();
        assertThat(repository.count()).isEqualTo(0);
    }

}