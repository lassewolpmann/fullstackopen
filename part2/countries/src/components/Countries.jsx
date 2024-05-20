import { useState, useEffect } from "react";
import weatherService from "../services/weather.js";

const Weather = ({ weather, capital }) => {
    if (weather) {
        const icon = weather["weather"][0]["icon"]
        const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`
        const icon_alt = weather["weather"][0]["description"]

        return (
            <>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weather["main"]["temp"]} °C</p>
                <img src={icon_url} alt={icon_alt} />
                <p>wind: {weather["wind"]["speed"]} m/s</p>
            </>
        )
    } else {
        return null
    }
}

const DetailedCountry = ({ country }) => {
    const name = country["name"]["common"]
    const capitals = country["capital"]
    const area = country["area"]
    const languages = Object.values(country["languages"])
    const flag = country["flags"]["svg"]
    const flagAlt = country["flags"]["alt"]
    const lat = country["capitalInfo"]["latlng"][0]
    const lon = country["capitalInfo"]["latlng"][1]

    const [weather, setWeather] = useState(null)

    const hook = () => {
        weatherService(lat, lon)
            .then(data => setWeather(data))
            .catch((error) => console.log(error))
    }

    useEffect(hook, [])

    return (
        <div>
            <h2>{name}</h2>
            <p>capital(s): {capitals.join(", ")}</p>
            <p>area: {area}</p>

            <h3>languages:</h3>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img src={flag} alt={flagAlt} width="128px" />
            <Weather weather={weather} capital={capitals[0]} />
        </div>
    )
}

const Country = ({ country, setSelectedCountry }) => {
    const handleClick = () => setSelectedCountry(country)

    return (
        <p>{country["name"]["common"]} <button onClick={handleClick}>show</button></p>
    )
}

const Countries = ({ countries, filter, selectedCountry, setSelectedCountry }) => {
    const filteredCountries = countries.filter((country) => {
        const name = country["name"]["common"].toLowerCase()

        return name.includes(filter.toLowerCase())
    })

    if (filteredCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <DetailedCountry country={filteredCountries[0]} />
        )
    } else if (selectedCountry) {
        return (
            <DetailedCountry country={selectedCountry} />
        )
    } else {
        return (
            <>
                {filteredCountries.map(country =>
                    <Country key={country["cca2"]} country={country} selectedCountry={selectedCountry}
                             setSelectedCountry={setSelectedCountry} />
                )}
            </>
        )
    }
}

export default Countries