import React from 'react'
import Controls from './controls'

import './style.css'

interface AppProps {
  children?: React.ReactNode
}

const App: React.FC<AppProps> = () => {
  return (
    <div className='app-container'>
      <Controls />
    </div>
  )
}

export default App
