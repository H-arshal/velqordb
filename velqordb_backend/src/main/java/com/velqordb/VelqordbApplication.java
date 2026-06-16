package com.velqordb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VelqordbApplication {

	public static void main(String[] args) {
		SpringApplication.run(VelqordbApplication.class, args);
	}

}
