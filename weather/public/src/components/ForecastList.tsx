import React, { useMemo } from 'react'
import type { WeatherForecastResponse } from '../services/weatherApi'
import type { TemperatureUnit } from './UnitToggle'
import { formatDateFromUnix } from '../utils/formatters'

type Props = {
  forecast: WeatherForecastResponse
  unit: TemperatureUnit
}

export const ForecastList: React.FC<Props> = ({ forecast, unit }) => {
  const daily = useMemo(() => {
    const byDay: Record<string, typeof forecast.list[0][]> = {}
    forecast.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000)
      const key = date.toISOString().slice(0, 10)
      if (!byDay[key]) byDay[key] = []
      byDay[key].push(entry)
    })
    return Object.entries(byDay)
      .slice(0, 5)
      .map(([key, entries]) => {
        const target = entries.find((e) => new Date(e.dt * 1000).getHours() === 12) || entries[Math.floor(entries.length / 2)]
        return { key, entry: target }
      })
  }, [forecast])

  const unitSymbol = unit === 'metric' ? '°C' : '°F'

  return (
    <section className="mt-4 grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      {daily.map(({ key, entry }) => {
        const icon = entry.weather?.[0]?.icon
        const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}.png` : ''
        return (
          <div key={key} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
            <div className="font-semibold mb-1">{formatDateFromUnix(entry.dt)}</div>
            {iconUrl && <img src={iconUrl} alt={entry.weather?.[0]?.main ?? ''} width={48} height={48} className="mx-auto" />}
            <div className="text-xl font-bold">{Math.round(entry.main.temp)}{unitSymbol}</div>
            <div className="text-slate-400 text-xs">{entry.weather?.[0]?.main}</div>
          </div>
        )
      })}
    </section>
  )
}



