import React from 'react'

export const Loading: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => (
  <div className="flex items-center gap-2 py-3">
    <div className="w-5 h-5 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin" aria-hidden />
    <div className="text-slate-400 text-sm">{label}</div>
  </div>
)



