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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() =>{
    //fetch user Location
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const {latitude, longitude} = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setUserLocation(`latitude:${latitude}, longitude:${longitude}`);
          //fetch weather data based on users location
          fetchWeatherData(latitude, longitude);
          //fetch reverse geocoding data
          getReverseGeocodingData(latitude, longitude);
        },
        (error)=>{
          console.error('error getting user location:', error)
        }
      );
    }  else {
      console.error('Geolocation is not supported by this browser.');
    }
  },[]);

  const fetchWeatherData = async (latitude, longitude) =>{
    try{
      const apiKey ="db890ac93e17f1efb0cdf1dc40f226b1";
      const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      
      setWeatherData(response.data);

    }catch(error){
      console.error('Error loading Weather Data:', error)
    }
  };

  const getReverseGeocodingData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      
      if (response.data) {
        const address = response.data.address;
        const city = address.city || address.town || address.village || address.hamlet || address.locality || '';
        const country = address.country || '';
        const continent = address.continent || '';
        
        console.log('City:', city);
        console.log('Country:', country);
        console.log('Continent:', continent);
      } else {
        throw new Error('No results found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
    }
  };



  return (
    <div className="App">
      <Header>
        <ListItem id='home'><Icon className="fa-solid fa-house" />Home</ListItem>
        <ListItem><Icon className="fa-brands fa-searchengin" /></ListItem>
        <ListItem><Icon className="fa-solid fa-user" /></ListItem>
      </Header>
      <FirstSection>
        <FirstDiv className="FirstDiv">
        <section>
        <h2><i class="fa-solid fa-location-dot"></i>Etche,</h2>
        <p>Rivers State</p>
        </section>
       
        <div>
            <img src={Sun} alt="cloud" />
            <section>
            <h4>Sunny</h4>
            <h1>29&deg;</h1>
            </section>
          </div>
          <div className='section'>
           <section> 
              <img src={RainCloud} alt="RainCloud" /> 
              <h2>87&deg;</h2>
              <p>7:43 PM</p>
            </section>
           <section> 
            <img src={SunnyRain} alt="RainCloud" />
            <h2>87&deg;</h2>
              <p>7:43 PM</p>
            </section>
           <section>  
           <img src={ThundeStorm} alt="RainCloud" />
           <h2>87&deg;</h2>
              <p>7:43 PM</p>
           </section>
          </div>
        </FirstDiv>
        <SecondDiv className='secondDiv'>
        <i class="fa-regular fa-snowflake"></i>
                    <section>
                    <h2><i class="fa-solid fa-cloud-rain"></i>Precipation</h2>
                    <h1>40%</h1>
                    </section>
                  
                    <section>
                    <h2><i class="fa-solid fa-wind"></i>Wind</h2>
                    <h1>25 km/h</h1>
                    </section>
                    <hr />                    
                    <section>
                    <h2><i class="fa-solid fa-water"></i>Humidity</h2>
                    <h1>20%</h1>
                    </section>
              
                    <section>
                    <h2><i class="fa-brands fa-wpressr"></i>Pressure</h2>
                    <h1>4,454 pa</h1>
                    </section>

        </SecondDiv>
      </FirstSection>
    </div>
  );
}

export default App;
