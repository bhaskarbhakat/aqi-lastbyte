import React, { useState, useEffect } from 'react';
import '../css/AirQuality.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function AirQuality() {
  const [airQualityData, setAirQualityData] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [country, setCountry] = useState('India');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setSearchQuery(`${city},${country}`);
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) {
      return 'Good';
    } else if (aqi <= 100) {
      return 'Moderate';
    } else if (aqi <= 180) {
      return 'Unhealthy';
    } else if (aqi <= 250) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const url = `${BASE_URL}?city=${city}&country=${country}`;
      console.log(url);
      fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
              } else if (response.status === 400) {
                setAirQualityData(null);
                throw new Error('Bad Request: Invalid input');
              } else {
                throw new Error('API request failed');
              }
        })
        .then(data => {
            setAirQualityData(data);
            setError(null);
          })
          .catch(error => {
            setError(error.message);
          });
    }
  }, [searchQuery]);

  return (
    <div className="container">
      <h1 className="title">Air Quality Index Search</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <input
          type="text"
          className="search-input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country name"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {airQualityData && (
        <div className="result-container">
            <h2>{airQualityData.city_name}, {airQualityData.country_code}</h2>
            <br/>
            <p className="aqi">AQI: {airQualityData.data[0].aqi} <span className={`aqi-label aqi-${getAQILabel(airQualityData.data[0].aqi).toLowerCase().replace(/ /g, '-')}`}>{getAQILabel(airQualityData.data[0].aqi)}</span></p>
            <p>co: {airQualityData.data[0].co}</p>
            <p>Mold Level: {airQualityData.data[0].mold_level}</p>
            <p>no2: {airQualityData.data[0].no2}</p>
            <p>o3: {airQualityData.data[0].o3}</p>
            <p>pm10: {airQualityData.data[0].pm10}</p>
            <p>pm25: {airQualityData.data[0].pm25}</p>
            <p>pollen level grass: {airQualityData.data[0].pollen_level_grass}</p>
            <p>pollen level tree: {airQualityData.data[0].pollen_level_tree}</p>
            <p>pollen level weed: {airQualityData.data[0].pollen_level_weed}</p>
            <p>predominant pollen type: {airQualityData.data[0].predominant_pollen_type}</p>
            <p>so2: {airQualityData.data[0].so2}</p>

        </div>
      )}
    </div>
  );
}

export default AirQuality;


// return (
//     <div>
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder="Enter city name"
//       />
//       <input
//         type="text"
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//         placeholder="Enter country name"
//       />
//       <button onClick={handleSearch}>Search</button>
//       {error && <p>Please enter valid city name</p>}
//       {airQualityData && (
//         <div>
//           <h2>{airQualityData.city_name}, {airQualityData.country_code}</h2>
//           <h2>Latitude: {airQualityData.lat}, Longitude: {airQualityData.lon}</h2>
//           <h2>TimeZone: {airQualityData.timezone}</h2>
//           <p>AQI: {airQualityData.data[0].aqi}</p>
//           <p>co: {airQualityData.data[0].co}</p>
//           <p>Mold Level: {airQualityData.data[0].mold_level}</p>
//           <p>no2: {airQualityData.data[0].no2}</p>
//           <p>o3: {airQualityData.data[0].o3}</p>
//           <p>pm10: {airQualityData.data[0].pm10}</p>
//           <p>pm25: {airQualityData.data[0].pm25}</p>
//           <p>pollen level grass: {airQualityData.data[0].pollen_level_grass}</p>
//           <p>pollen level tree: {airQualityData.data[0].pollen_level_tree}</p>
//           <p>pollen level weed: {airQualityData.data[0].pollen_level_weed}</p>
//           <p>predominant pollen type: {airQualityData.data[0].predominant_pollen_type}</p>
//           <p>so2: {airQualityData.data[0].so2}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AirQuality;