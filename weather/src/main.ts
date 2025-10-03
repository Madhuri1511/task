import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { App } from './App'

const rootElement = document.getElementById('app') as HTMLElement
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
