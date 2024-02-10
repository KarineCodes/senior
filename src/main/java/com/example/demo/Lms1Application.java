package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication
(exclude = SecurityAutoConfiguration.class)
//(exclude = {UserDetailsServiceAutoConfiguration.class})
//(exclude = {HibernateJpaAutoConfiguration.class})
//(exclude = {DataSourceAutoConfiguration.class })
//@EntityScan(basePackages = "com.example.demo.entities")
public class Lms1Application {

	public static void main(String[] args) {
		SpringApplication.run(Lms1Application.class, args);
	
//
//    Scanner scanner = new Scanner(System.in);
//
//    while (true) {
//        System.out.print("Scan a barcode: ");
//        String barcodeValue = scanner.nextLine().trim();
//
//        //Process the barcode in your Spring Boot application
//        System.out.println("Received Barcode: " + barcodeValue);
//
//        // Add your business logic here
//
//        // Optionally, break the loop on a specific condition (e.g., exit command)
//        if ("exit".equalsIgnoreCase(barcodeValue)) {
//            break;
//        }
//    }
//
//    scanner.close();
}
}


