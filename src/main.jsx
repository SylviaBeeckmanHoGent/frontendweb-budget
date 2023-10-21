import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './contexts/Theme.context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/*strict mode is een component dat je rond heel uw applicatie zet > gaat ervoor zorgen dat je geen dingen doet die niet mogen*/}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
