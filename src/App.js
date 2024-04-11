import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Header, ListItem, Icon, FirstSection, FirstDiv, SecondDiv } from './App.styled';
import RainCloud from '../src/images/rain-storm.png';
import SunnyRain from '../src/images/sunny-rain.png';
import ThundeStorm from '../src/images/thunder-storm.png';
import Sun from '../src/images/sun.png';







function App() {

  const [userLocation, setUserLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [addressData, setAddressData] = useState({ city: '', country: '', state: '' });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchDataAndLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation(`latitude:${latitude}, longitude:${longitude}`);
            await fetchWeatherData(latitude, longitude);
            await getReverseGeocodingData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchDataAndLocation();

    const intervalId = setInterval(fetchDataAndLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = "909ce28638e448d2969184233241104";
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setImageSrc(getWeatherImage(response.data?.current?.condition?.text));
    } catch (error) {
      console.error('Error loading Weather Data:', error);
      // Display an error message to the user
    }
  };

  const getWeatherImage = (description) => {
    if (description) {
      const lowerCaseDescription = description.toLowerCase();
      if (lowerCaseDescription.includes('rain')) {
        return RainCloud;
      } else if (lowerCaseDescription.includes('cloud')) {
        return SunnyRain;
      } else if (lowerCaseDescription.includes('sun')) {
        return Sun;
      }
    }
    return null;
  };

  const getReverseGeocodingData = async (latitude, longitude) => {
    try {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        const response = await axios.get(apiUrl);

        if (response.data) {
            const address = response.data.address;
            const city = address.city || address.town || address.village || address.hamlet || address.locality || '';
            const country = address.country || '';
            const state = address.state || '';

            setAddressData({ city, country, state });
        } else {
            throw new Error('No results found for the given coordinates.');
        }
    } catch (error) {
        console.error('Error fetching reverse geocoding data:', error);
    }
};


  const renderWeatherDescription = () => {
    if (weatherData && weatherData.current && weatherData.current.condition && weatherData.current.condition.text) {
      return <h4>{weatherData.current.condition.text}</h4>;
    }
    return null;
  };

  const renderWeatherTemp = () => {
    if (weatherData && weatherData.current && weatherData.current.temp_c) {
      return <h1>{weatherData.current.temp_c} &deg;C</h1>;
    }
    return null;
  };

  const renderVisibility = () => {
    if (weatherData && weatherData.current && weatherData.current.vis_km) {
      return <h1>{weatherData.current.vis_km} km</h1>;
    }
    return null;
  };
  
  const renderWeatherHumidity = () => {
    if (weatherData && weatherData.current && weatherData.current.humidity) {
      return <h1>{weatherData.current.humidity} %</h1>;
    }
    return null;
  };
  
  const renderWeatherPressure = () => {
    if (weatherData && weatherData.current && weatherData.current.pressure_mb) {
      return <h1>{weatherData.current.pressure_mb} mb</h1>;
    }
    return null;
  };
    
  const renderWeatherWind = () => {
    if (weatherData && weatherData.current && weatherData.current.wind_kph) {
      return <h1>{weatherData.current.wind_kph} km/h</h1>;
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
    const intervalId = setInterval(updateImageSrc, 2000);

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
