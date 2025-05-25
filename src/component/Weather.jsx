import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png'
import humidity from '../assets/humidity.png'
import wind1 from '../assets/wind (1).png'
import cloudy from '../assets/cloudy.png'
import cloud from '../assets/cloud.png'
import heavy_rain from '../assets/heavy-rain.png'
import snow from '../assets/snow.png'
import storm from '../assets/storm.png'
import thunder from '../assets/thunderstorm.png'
const Weather = () => {

  const [weatherdata,setweatherdata] = useState(false);
  const inputref = useRef()

  const allicons = {
    "01d":  cloudy,
    "01n" : cloud,
    "02d" : cloud,
    "03d" : cloud, 
    "03n" : cloud,
    "04d" : cloud,
    "04n" : heavy_rain,
    "09d" : heavy_rain,
    "09n" : heavy_rain,
    "10d" : heavy_rain,
    "10n" : heavy_rain,
    "13d" : snow,
    "13n" : snow,
    "11d" : thunder,
    "50n" : cloud
   }

  const search = async (city) => {
    if(city === ""){

      alert("Enter city Name")
      return;
    }
    try{
      const API_KEY = '2947936a51d88e4ae9d4bc3e4aa8624a'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      const responce = await fetch(url);
      const data = await responce.json();
      console.log(data);
      if(!responce.ok){
        alert(data.message);
        return;
      }
      const icon = allicons[data.weather[0].icon] || heavy_rain;
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location: data.name,
        icon : icon,
        description : data.weather[0].description
      })
    }
    catch(error)
    {
        setweatherdata(false);
        console.error("error in fetching data")
    }
  }
  useEffect(() => {
    // search("chennai")
  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputref}type='text' placeholder='Search'/>
            <img src={search_icon} alt='' onClick={()=>search(inputref.current.value)}/>
        </div>
        {weatherdata?<>
               <img src={weatherdata.icon} alt="" className='weather-icon'/>
        <p className='temp'>{weatherdata.temperature}°C</p>
        <p className='location'>{weatherdata.location}</p>
        <p className='description'>{weatherdata.description}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p>{weatherdata.humidity}</p>
              <span>humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind1} alt=""/>
            <p>{weatherdata.windspeed}</p>
            <span>windspeed</span>
          </div>
        </div>
           </>:<></>}
    </div>
  )
}

export default Weather