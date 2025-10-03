import React from 'react'
// Tailwind version

type Props = {
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  loading?: boolean
}

export const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form
      className="flex gap-2 my-3"
      onSubmit={(e) => {
        e.preventDefault()
        if (!loading) onSubmit()
      }}
    >
      <input
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 text-slate-100 px-3 py-2 text-sm outline-none focus:border-blue-400"
        placeholder="Search city e.g. London"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!!loading}
      />
      <button
        type="submit"
        disabled={!!loading}
        className="rounded-lg border border-blue-500 bg-blue-700 text-white font-semibold px-4 py-2 disabled:opacity-60"
      >
        Search
      </button>
    </form>
  )
}



