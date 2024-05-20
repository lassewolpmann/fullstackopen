import axios from 'axios';
const api_key = import.meta.env.VITE_WEATHER_KEY;
const base_url = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (lat, lon) => {
    const url = `${base_url}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const request = axios.get(url);

    return request.then(response => response.data)
}

export default getWeather;