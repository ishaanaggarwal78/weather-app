import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import search_icon from './assets/search.png'
import clear from './assets/clear.png'
import cloudy from './assets/cloudy.webp'
import drizzle from './assets/drizzle.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import rainy from './assets/rainy.webp'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'

function Weather() {


  // function weatherdetails(city) {
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e86adabee62951c59962606ef90527f7`

  //   axios.get(url)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // useEffect(() => {
  //   weatherdetails("Delhi")
  // });


  let inputRef = useRef()
  let [weatherData, setWeatherData] = useState(false)

  let weatherIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "09d": drizzle,
    "09n": drizzle,
    "10d": rainy,
    "10n": rainy,
    "13d": snow,
    "13n": snow,
    "11d": wind,
    "11n": wind,
  };

  const search = async (city) => {

    if (city === "") {
      alert("Enter City name")
      return;
    }
    else {

    }
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e86adabee62951c59962606ef90527f7`;

      let response = await fetch(url);
      let data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      };

      const icon = weatherIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      console.log(data);

    }
    catch (error) {
      console.log("Error fetching the data");
    }
  }


  useEffect(() => {
    let input = document.getElementById('inputField')
    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        search(inputRef.current.value)
      }
    })
  });



  return (
    <>
      <div className="outer">
        <div className="main">
          <div className="search">
            <input ref={inputRef} type="text" placeholder='Search City' id='inputField' />
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
          </div>

          {weatherData ? <>
            <div className="temperature">
              <div className="temp_img">
                <img src={weatherData.icon} alt="" />
              </div>
              <div className="city">
                <h1>{weatherData.temperature}°<sup></sup>c</h1>
                <h3>{weatherData.location}</h3>
              </div>
            </div>


            <div className="data">
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <div className="weather_info">
                    <h5>Humidity</h5>
                    <h4>{weatherData.humidity}%</h4>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="weather_info">
                    <h5>Wind</h5>
                    <h4>{weatherData.wind}km/h</h4>
                  </div>
                </div>
                {/* <div className="col-lg-6">
              <div className="weather_info">
                <h5>UV Index</h5>
                <h4>14km/h</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="weather_info">
                <h5>Dew Point</h5>
                <h4>14km/h</h4>
              </div>
            </div> */}
              </div>
            </div>
          </> : <></>}
        </div>
      </div>
    </>
  );
};

export default Weather;
