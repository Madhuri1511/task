import type { WeatherCurrentResponse } from './weatherApi'

const KEY = 'weather_history_v1'

export type SearchHistoryItem = {
  city: string
  ts: number
  current: WeatherCurrentResponse
}

export function loadHistory(): SearchHistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SearchHistoryItem[]) : []
  } catch {
    return []
  }
}

export function saveHistory(item: SearchHistoryItem): SearchHistoryItem[] {
  const current = loadHistory()
  const filtered = current.filter((h) => h.city.toLowerCase() !== item.city.toLowerCase())
  const next = [item, ...filtered].slice(0, 20)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}



