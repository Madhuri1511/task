import React from 'react'

export type TemperatureUnit = 'metric' | 'imperial'

type Props = {
  unit: TemperatureUnit
  onChange: (unit: TemperatureUnit) => void
}

export const UnitToggle: React.FC<Props> = ({ unit, onChange }) => {
  return (
    <div role="tablist" aria-label="Temperature unit" className="inline-flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      <button type="button"
        className={"px-3 py-2 font-semibold " + (unit === 'metric' ? 'bg-blue-700 text-white' : 'text-slate-100')}
        onClick={() => onChange('metric')}
      >
        °C
      </button>
      <button type="button"
        className={"px-3 py-2 font-semibold " + (unit === 'imperial' ? 'bg-blue-700 text-white' : 'text-slate-100')}
        onClick={() => onChange('imperial')}
      >
        °F
      </button>
    </div>
  )
}



