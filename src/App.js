import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, ListItem, Icon, FirstSection, FirstDiv, SecondDiv } from './App.styled';
import RainCloud from '../src/images/rain-storm.png';
import SunnyRain from '../src/images/sunny-rain.png';
import ThundeStorm from '../src/images/thunder-storm.png';
import Sun from '../src/images/sun.png';




function App() {

  const [userLocation, setUserLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [addressData, setAddressData] = useState({ city: '', country: '', state: '' });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setUserLocation(`latitude:${latitude}, longitude:${longitude}`);
            fetchWeatherData(latitude, longitude);
            getReverseGeocodingData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchUserLocation();
    const intervalId = setInterval(() => {
      fetchWeatherData(latitude, longitude);
      getReverseGeocodingData(latitude, longitude);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = "db890ac93e17f1efb0cdf1dc40f226b1";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(weatherData)
    } catch (error) {
      console.error('Error loading Weather Data:', error);
      alert("Error loading Weather Data due to Bad Network")
    }
  };

  const getReverseGeocodingData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
  
      if (response.status === 200 && response.data) {
        const address = response.data.address;
        const city = address.city || address.town || address.village || address.hamlet || address.locality || '';
        const country = address.country || '';
        const state = address.state || '';
  
        setAddressData({ city, country, state });
       
      } else {
        console.error('No data found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      alert("Error fetching user Location  due to Bad Network")
      console.log(userLocation);
      console.log(addressData);
     
    }
  };
  
  


  const renderWeatherDescription = () => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      return <h4>{weatherData.weather[0].description}</h4>;
    }
    return null;
  };

  const renderWeatherTemp = () => {
    if (weatherData && weatherData.main && weatherData.main.temp) {
      return <h1>{weatherData.main.temp} &deg;C</h1>;
    }
    return null;
  };

  const renderWeatherWind = () => {
    if (weatherData && weatherData.wind && weatherData.wind.speed) {
      return <h1>{weatherData.wind.speed} m/s</h1>;
    }
    return null;
  };

  const renderWeatherPressure = () => {
    if (weatherData && weatherData.main && weatherData.main.pressure) {
      const pressure = weatherData.main.pressure;
      return <h1>{pressure} hPa</h1>;
    }
    return null;
  };

  const renderWeatherRainVolume = () => {
    if (weatherData && weatherData.rain && weatherData.rain['1h']) {
      const rainVolume = weatherData.rain['1h'];
      return <h1>{rainVolume} mm/h</h1>;
    }
    return null;
  };

  const renderWeatherHumidity = () => {
    if (weatherData && weatherData.main && weatherData.main.humidity) {
      return <h1>{weatherData.main.humidity} %</h1>;
    }
    return null;
  };

  const renderVisibility = () => {
    if (weatherData && weatherData.visibility) {
      const visibility = weatherData.visibility / 1000;
      return <h1>{visibility} km</h1>;
    }
    return null;
  };

  const renderCity = () => {
    if (addressData.city) {
      return <h1>{addressData.city}</h1>;
    }
    return null;
  };

  const renderState = () => {
    if (addressData.state) {
      return <p>{addressData.state}</p>;
    }
    return null;
  };

  const renderCountry = () => {
    if (addressData.country) {
      return <h2>{addressData.country}</h2>;
    }
    return null;
  };

  useEffect(() => {
    const updateImageSrc = () => {
      const element = document.getElementById('weatherDescription');
      const image = document.getElementById('weatherImage');

      if (element) {
        const textContent = element.textContent.toLowerCase();
        if (textContent.includes('rain')) {
          setImageSrc(RainCloud);
        } else if (textContent.includes('cloud')) {
          setImageSrc(SunnyRain);
        } else if (textContent.includes('sun')) {
          setImageSrc(Sun);
        } else {
          setImageSrc(null);
        }
      }
    };

    updateImageSrc();
    const intervalId = setInterval(updateImageSrc, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Header>
        <ListItem id='home'><Icon className="fa-solid fa-house" />Home</ListItem>
        <ListItem><Icon className="fa-brands fa-searchengin" /></ListItem>
        <ListItem><Icon className="fa-solid fa-user" /></ListItem>
      </Header>
      <FirstSection>
        <FirstDiv className="FirstDiv">
        <section className='location'>

        {renderCity()}
        {renderState()}
        </section>
       
        <div>
            <img src={imageSrc} alt="cloud" id='weatherImage' />
            <section id='weatherDescription'>
            {renderWeatherDescription()}
            {renderWeatherTemp()}
            </section>
          </div>
         
        </FirstDiv>
        <SecondDiv className='secondDiv'>
        <i class="fa-regular fa-snowflake"></i>
                    <section>
                    <h2><i class="fa-solid fa-eye"></i>Visibility</h2>
                    {renderVisibility()}
                    </section>
                  
                    <section>
                    <h2><i class="fa-solid fa-wind"></i>Wind</h2>
                    {renderWeatherWind()}
                    </section>
                    <hr />                    
                    <section>
                    <h2><i class="fa-solid fa-water"></i>Humidity</h2>
                   {renderWeatherHumidity()}
                    </section>
              
                    <section>
                    <h2><i class="fa-brands fa-wpressr"></i>Pressure</h2>
                   {renderWeatherPressure()}
                    </section>

        </SecondDiv>
      </FirstSection>
    </div>
  );
}

export default App;
