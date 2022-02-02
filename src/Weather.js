/* eslint-disable no-unused-expressions */
import React, { useState} from "react";
import "./index.css";

function Weather() {

  const apiKey = "968f001a325a971b3294ce348a819ccf";
  const [query, setQuery] = useState ('');
  const [weather, setWeather] = useState({});
  const search = event =>{
      if(event.key === "Enter"){
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`)
          .then(res =>res.json())
          .then(result => {
              setWeather(result);
              setQuery('');
              console.log(result);
        });
      }
  }

const dateBuilder = (d) =>{
    let months = ["January,", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
}
  return (
      <>
      {/* Changing background according to the weather of particular place */}
    <div className={
        (typeof weather.main !== "undefined") ? ((weather.weather[0].main === "Clouds") ? 'cloud' : ((weather.weather[0].main === "Thunderstorm") ? 'ts' : ((weather.weather[0].main === "Snow") ? 'cold' : 'warm'))) : 'app'}>
      <div className="header">
      <h1 className="heading">KnoWeather</h1>
      </div>
      <div className="main-1">
        <input
            className="input"
            placeholder="Enter City..."
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
        />
        
        </div>
            {(typeof weather.main !== "undefined" ) ? (
            <div className="main-2">
                <div className="info">
                    <h1>{weather.name}, {weather.sys.country}</h1>
                    <h3>{dateBuilder(new Date())}</h3>
                </div>
                <div className="box">
                    <div className="left">
                        {/* <div className="left-card"></div> */}
                        <h2 className="temp"> {Math.round(weather.main.temp)}&deg;C</h2>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                        <h2 className="desc">{weather.weather[0].description}</h2>
                    </div>
                    <div className="right">
                        <table>
                            <tr>
                                <td> Wind<br></br><span>{weather.wind.speed}</span></td>
                                <td>Pressure<br></br><span>{weather.main.pressure}</span></td>
                                <td>Humidity<br></br><span>{weather.main.humidity}</span></td>
                            </tr>
                            <tr>
                                <td>Feels Like<br></br><span>{weather.main.feels_like}&deg;C</span></td>
                                <td>Max. Temp<br></br><span>{weather.main.temp_max}&deg;C</span></td>
                                <td>Min. Temp<br></br><span>{weather.main.temp_min}&deg;C</span></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            ) : (
                <div className="wel">
                <h1>Welcome to <span>KnoWeather</span></h1>
                <p>Enter the City Name</p>
                </div>
            )}
        <footer>Copyright (c) 2021</footer>
        </div>
        </>
    )
}
export default Weather;
