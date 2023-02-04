package com.example.cardatabase.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cardatabase.domain.Car;
import com.example.cardatabase.domain.CarRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CarController {

    private final CarRepository carRepository;

    @RequestMapping("/cars")
    public Iterable<Car> getCars() {
        return carRepository.findAll();
    }
}