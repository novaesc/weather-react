import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default function Weather(props) {
    function handleResponse(response) {
        alert(`The temperature in ${response.data.name} is ${Math.round(response.data.main.temp)}°C`);
   
    }
    let apiKey = "88724523008dc9e1be18f6eb6a959b67";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
return (
  <Loader
    visible={true}
    height="100"
    width="100"
    strokeColor="blue"
    strokeWidth="5"
    animationDuration="0.75"
    ariaLabel="rotating-lines-loading"
  />
);
}