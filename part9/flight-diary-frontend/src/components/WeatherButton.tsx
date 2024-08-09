import React, { BaseSyntheticEvent } from "react";
import { Weather } from "../types.ts";

interface WeatherButtonProps {
  weather: Weather
  setWeather: React.Dispatch<React.SetStateAction<Weather>>
  value: string
}

const WeatherButton = (props: WeatherButtonProps) => {
  const { weather, setWeather, value } = props;

  const handleChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value;

    if (value === "sunny") {
      setWeather(Weather.Sunny)
    } else if (value === "rainy") {
      setWeather(Weather.Rainy)
    } else if (value === "cloudy") {
      setWeather(Weather.Cloudy)
    } else if (value === "stormy") {
      setWeather(Weather.Stormy)
    } else if (value === "windy") {
      setWeather(Weather.Windy)
    } else {
      console.error("Invalid option")
    }
  }

  return (
    <div>
      <input type="radio" name="weather" value={value} onChange={handleChange} checked={weather === value} />
      <label htmlFor={"weather"}>{value}</label>
    </div>
  )
}

export default WeatherButton