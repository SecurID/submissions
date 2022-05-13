import { Language } from './Language'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState({
        'main': { 'temp': '0' },
        'wind': { 'speed': '0'},
        'weather': [{'icon':  ''}]
            
    })
    const languages = Object.entries(country.languages);

    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
    const params = {
        'lat' : country.latlng[0],
        'lon' : country.latlng[1],
        'appid' : '824782b8349910d2a607e17f2554b856'
    }

    const url = baseUrl + new URLSearchParams(params).toString();

    useEffect(() => {
        axios
          .get(url)
          .then(response => {
              setWeather(response.data)
            })
      }, [])// eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <>
        <h1>{country.name.common}</h1>
        capital {country.capital[0]} 
        <br />
        area {country.area}

        <h2>languages</h2>
        {languages.map((key, value) => <Language name={key} />)}
        
        
        <img alt="yolo" src={country.flags[0]} width="100" heigth="100" />

        <h2>Weather</h2>
        temperature {weather.main.temp}
        wind {weather.wind.speed}

        <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="lol" />
        </>
    )
}

export { CountryDetail };