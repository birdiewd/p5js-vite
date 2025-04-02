import { ChangeEvent, FC } from 'react'
import { ControlsProps } from '../App'

const Controls: FC<ControlsProps> = ({
  run,
  setRun,
  setShowCircle,
  showCircle,
  setCircleCount,
  circleCount,
  setCircleSpacing,
  circleSpacing,
}) => {
  const handleCircleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCircle(event.currentTarget.checked)
  }

  const handleCircleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCircleCount(parseInt(event.currentTarget.value))
  }

  const handleCircleSpacingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCircleSpacing(parseInt(event.currentTarget.value))
  }

  return (
    <div>
      <button onClick={() => setRun(!run)}>{run ? 'Stop' : 'Start'}</button>
      <br />

      <label>
        <input type='checkbox' onChange={handleCircleToggle} checked={showCircle} />
        Show
      </label>
      <br />

      <label>
        <input
          type='range'
          onChange={handleCircleCountChange}
          min={1}
          max={100}
          step={1}
          value={circleCount}
        />
        Count
      </label>
      <br />

      <label>
        <input
          type='range'
          onChange={handleCircleSpacingChange}
          min={1}
          max={10}
          step={1}
          value={circleSpacing}
        />
        Spacing
      </label>
    </div>
  )
}

export default Controls
