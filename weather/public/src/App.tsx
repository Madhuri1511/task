import React, { useEffect, useMemo, useState } from 'react'
import { fetchCurrentWeather, fetchForecast } from './services/weatherApi'
import type { WeatherCurrentResponse, WeatherForecastResponse } from './services/weatherApi'
import { formatToCelsius, formatToFahrenheit, formatDateFromUnix } from './utils/formatters'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { ForecastList } from './components/ForecastList'
import { UnitToggle } from './components/UnitToggle'
import type { TemperatureUnit } from './components/UnitToggle'
import { Loading } from './components/Loading'
import { ErrorBanner } from './components/ErrorBanner'
import { loadHistory, saveHistory } from './services/localStorage'
import type { SearchHistoryItem } from './services/localStorage'

// Tailwind will handle global styles

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('London')
  const [unit, setUnit] = useState<TemperatureUnit>('metric')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState<WeatherCurrentResponse | null>(null)
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(null)
  const [history, setHistory] = useState<SearchHistoryItem[]>(loadHistory())

  const handleSearch = async (city: string) => {
    if (!city.trim()) return
    setError(null)
    setLoading(true)
    try {
      const [cur, fore] = await Promise.all([
        fetchCurrentWeather(city, unit),
        fetchForecast(city, unit),
      ])
      setCurrent(cur)
      setForecast(fore)
      const item: SearchHistoryItem = { city: cur.name, ts: Date.now(), current: cur }
      const updated = saveHistory(item)
      setHistory(updated)
    } catch (e: any) {
      if (e?.response?.status === 404) {
        setError('City not found. Try another search.')
      } else {
        setError('Failed to fetch weather. Check your connection or API key.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  const displayedForecast = useMemo(() => forecast, [forecast])

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-16">
      <header className="flex flex-wrap items-center gap-3 justify-between mb-4">
        <h1 className="text-xl font-bold">Weather Dashboard</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => handleSearch(query)}
          loading={loading}
        />
        {history.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {history.slice(0, 10).map((h) => (
              <button key={h.ts} onClick={() => handleSearch(h.city)}
                className="bg-slate-800 text-slate-100 border border-slate-600 rounded-full px-3 py-1 text-xs hover:border-blue-400">
                {h.city}
              </button>
            ))}
          </div>
        )}

        {error && <ErrorBanner message={error} />}
        {loading && <Loading label="Loading weather..." />}

        {!loading && current && (
          <WeatherCard
            city={current.name}
            temp={current.main.temp}
            condition={current.weather[0]?.main ?? ''}
            humidity={current.main.humidity}
            windSpeed={current.wind.speed}
            icon={current.weather[0]?.icon ?? ''}
            unit={unit}
          />)
        }

        {!loading && displayedForecast && (
          <ForecastList forecast={displayedForecast} unit={unit} />
        )}
    </div>
  )
}


