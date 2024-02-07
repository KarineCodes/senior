package com.example.demo;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;
// import org.springframework.web.servlet.config.annotation.EnableWebMvc;

// @Configuration
// @EnableWebMvc
// public class CorsConfig {

//     @Bean
//     CorsFilter corsFilter() {
	
// 		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
// 		CorsConfiguration config = new CorsConfiguration();
		
// 		config.setAllowCredentials(true);
		
// 		config.addAllowedOrigin("http://localhost:5173"); // Add your frontend's origin
// 		config.addAllowedHeader("*");
		
// 		config.addAllowedMethod("*");
		
// 		source.registerCorsConfiguration("/**", config);
		
// 		return new CorsFilter(source);
// 	}
// }

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
				.maxAge(3600);
    }
    
}
