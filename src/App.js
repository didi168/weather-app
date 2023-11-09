import React from 'react';
import { Header, ListItem, Icon, FirstSection, FirstDiv, SecondDiv } from './App.styled';
import RainCloud from '../src/images/rain-storm.png';
import SunnyRain from '../src/images/sunny-rain.png';
import ThundeStorm from '../src/images/thunder-storm.png';
import Sun from '../src/images/sun.png';

function App() {
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
