export function formatToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9)
}

export function formatToFahrenheit(celsius: number): number {
  return celsius * (9 / 5) + 32
}

export function formatDateFromUnix(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000)
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}



