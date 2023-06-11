package com.example.aqibackend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AirQualityDto {
    private String city_name;
    private String country_code;
    private Data[] data;
    private String lat;
    private String lon;
    private String state_code;
    private String timezone;

    @Getter
    @Setter
    public static class Data {
        private int aqi;
        private int co;
        private int mold_level;
        private int no2;
        private int o3;
        private int pm10;
        private int pm25;
        private int pollen_level_grass;
        private int pollen_level_tree;
        private int pollen_level_weed;
        private String predominant_pollen_type;
        private int so2;
    }
}
