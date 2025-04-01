import { useState } from 'react'
import Art from './Art'
import Controls from './Controls'

import './style.css'

export interface ControlsProps {
  run: boolean
  setRun: (arg0: boolean) => void
  // ===
  showCircle: boolean
  setShowCircle: (arg0: boolean) => void
  circleCount: number
  setCircleCount: (arg0: number) => void
  circleSpacing: number
  setCircleSpacing: (arg0: number) => void
}

const App = () => {
  const [run, setRun] = useState(false)
  // ===
  const [showCircle, setShowCircle] = useState(true)
  const [circleCount, setCircleCount] = useState(10)
  const [circleSpacing, setCircleSpacing] = useState(10)

  return (
    <>
      <Art
        run={run}
        showCircle={showCircle}
        circleCount={circleCount}
        circleSpacing={circleSpacing}
      />
      <Controls
        run={run}
        setRun={setRun}
        // ==
        showCircle={showCircle}
        setShowCircle={setShowCircle}
        circleCount={circleCount}
        setCircleCount={setCircleCount}
        circleSpacing={circleSpacing}
        setCircleSpacing={setCircleSpacing}
      />
    </>
  )
}

export default App
