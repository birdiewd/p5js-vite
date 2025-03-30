import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import art from './art'

art()

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
