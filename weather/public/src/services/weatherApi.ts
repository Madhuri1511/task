import axios from 'axios'
import type { TemperatureUnit } from '../components/UnitToggle'

const API_BASE = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string

if (!API_KEY) {
  // Aid discoverability during dev
  // eslint-disable-next-line no-console
  console.warn('VITE_OPENWEATHER_API_KEY not set. Create .env.local with your key.')
}

export type WeatherCurrentResponse = {
  name: string
  main: { temp: number; humidity: number }
  wind: { speed: number }
  weather: { main: string; description: string; icon: string }[]
}

export type WeatherForecastResponse = {
  list: { dt: number; main: { temp: number }; weather: { main: string; icon: string }[] }[]
}

export async function fetchCurrentWeather(city: string, units: TemperatureUnit) {
  const { data } = await axios.get<WeatherCurrentResponse>(`${API_BASE}/weather`, {
    params: { q: city, appid: API_KEY, units },
  })
  return data
}

export async function fetchForecast(city: string, units: TemperatureUnit) {
  const { data } = await axios.get<WeatherForecastResponse>(`${API_BASE}/forecast`, {
    params: { q: city, appid: API_KEY, units },
  })
  return data
}



