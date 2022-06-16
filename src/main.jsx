import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { getCountryZones } from './utils'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

getCountryZones().then(console.log)