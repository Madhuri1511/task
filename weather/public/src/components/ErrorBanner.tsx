import React from 'react'

export const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <div role="alert" className="mt-3 px-3 py-2 rounded-lg border border-red-900 bg-red-950 text-red-200 text-sm">{message}</div>
)



