import React from 'react'
import type { TemperatureUnit } from './UnitToggle'

type Props = {
  city: string
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  unit: TemperatureUnit
}

export const WeatherCard: React.FC<Props> = ({ city, temp, condition, humidity, windSpeed, icon, unit }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F'
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''
  return (
    <section className="bg-slate-800 border border-slate-700 rounded-xl p-4 grid grid-cols-[auto,1fr,auto] items-center gap-3 mt-4">
      {iconUrl && <img src={iconUrl} width={72} height={72} alt={condition} />}
      <div>
        <h2 className="m-0 text-lg font-semibold">{city}</h2>
        <div className="text-slate-400 text-sm">{condition} • Humidity {humidity}% • Wind {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</div>
      </div>
      <div className="text-3xl font-extrabold">{Math.round(temp)}{unitSymbol}</div>
    </section>
  )
}



