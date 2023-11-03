import React, { useState } from 'react';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import rain_icon from '../Assets/rain.png';
// import logo from '../Assets/logo.png'
import '../WeatherApp/Weather.css';

const WeatherApp = () => {
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState('');
    const [wicon, setWicon] = useState(cloud_icon);

    const api_key = 'api_key';

    const search = async () => {
        const element = document.getElementsByClassName("city-input")[0];

        if (element.value === "") {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemperature(Math.floor(data.main.temp));
            setLocation(data.name);

            const iconCode = data.weather[0].icon;

            if (iconCode === '01d' || iconCode === '01n') {
                setWicon(clear_icon);
            } else if (iconCode === '02d' || iconCode === '02n') {
                setWicon(cloud_icon);
            } else if (iconCode === '03d' || iconCode === '03n') {
                setWicon(drizzle_icon);
            } else if (iconCode === '04d' || iconCode === '04n') {
                setWicon(drizzle_icon);
            } else if (iconCode === '09d' || iconCode === '09n') {
                setWicon(rain_icon);
            } else if (iconCode === '10d' || iconCode === '10n') {
                setWicon(rain_icon);
            } else if (iconCode === '13d' || iconCode === '13n') {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }

        } catch (error) {
            console.error('Error fetching weather data', error);
        }
    };

    return (
        <div>



            <div className='container'>
                <div className='top-bar'>
                    <input className='city-input' type="text" placeholder='search' />
                    <div className='search-icon' onClick={search}>
                        <img src={search_icon} alt='' />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather-temp">{temperature}°C</div>
                <div className='weather-location'>{location}</div>
                <div className="data-container">
                    <div className='element'>
                        <img src={humidity_icon} alt='' className='icon' />
                        <div className="data">
                            <div className="humidity-percentage">
                                {humidity}%
                            </div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={wind_icon} alt='' className='icon' />
                        <div className="data">
                            <div className="wind-rate">
                                {wind} km/h
                            </div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
