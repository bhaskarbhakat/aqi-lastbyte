package com.example.aqibackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.aqibackend.dtos.AirQualityDto;
import com.example.aqibackend.dtos.AirQualityResponseDto;

@RestController
public class AirQualityController {
    
    private final RestTemplate restTemplate;
    private String apiKey;
    private String apiUrl;

     public AirQualityController(RestTemplate restTemplate,
                                @Value("${api.key}") String apiKey,
                                @Value("${api.url}") String apiUrl) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    @GetMapping("/air-quality")
    public ResponseEntity<AirQualityResponseDto> getAirQualityByCityAndCountry(@RequestParam("city") String city,
                           @RequestParam("country") String country){

        String url = apiUrl + "?city=" + city + "&country=" + country + "&key=" + apiKey;
        ResponseEntity<AirQualityDto> apiResponse = restTemplate.getForEntity(url, AirQualityDto.class);
    
        // Extract the response body
        AirQualityDto airQualityResponse = apiResponse.getBody();

        if (airQualityResponse != null && airQualityResponse.getData().length > 0) {

            AirQualityResponseDto responseData = new AirQualityResponseDto();

            // Set the entire data from AirQualityDto in one go
            responseData.setData(airQualityResponse.getData());
            responseData.setCity_name(airQualityResponse.getCity_name());
            responseData.setCountry_code(airQualityResponse.getCountry_code());
            responseData.setTimezone(airQualityResponse.getTimezone());

            // Return the processed air quality data
            return ResponseEntity.ok(responseData);
        } else {

            return ResponseEntity.notFound().build();
        }
    }
}