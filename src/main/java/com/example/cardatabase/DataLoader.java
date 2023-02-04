package com.example.cardatabase;

import com.example.cardatabase.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final CarRepository carRepository;
    private final OwnerRepository ownerRepository;
    private final UserRepository userRepository;
    @Override
    public void run(String... args) throws Exception {
       Owner owner1 = new Owner("John", "Johnson");
       Owner owner2 = new Owner("Mary", "Robinson");
       ownerRepository.saveAll(Arrays.asList(owner1, owner2));

       Car car1 = new Car("Ford", "Mustang", "Red", "ADF-1121", 2021, 59000, owner1);
       Car car2 = new Car("Nissan", "Leaf", "white", "SSJ-3002", 2019, 29000, owner2);
       Car car3 = new Car("Toyota", "Prius", "Silver", "KKO-0212", 2020, 39000, owner2);
       carRepository.saveAll(Arrays.asList(car1, car2, car3));

       carRepository.findAll().forEach((car) -> {
           log.info(car.getBrand() + " " + car.getModel());
       });

       // Username: user, password: user
       userRepository.save(new User("user",
               "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue","USER"));
       // Username: admin, password: admin
       userRepository.save(new User("admin",
               "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
    }
}
