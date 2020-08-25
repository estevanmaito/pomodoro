import React, { useEffect, useState } from 'react'

import date from '../helpers/formatDate'

interface Props {
  duration: number
  elapsedTime: number
}

function Timer({ duration, elapsedTime }: Props) {
  const [timer, setTimer] = useState('Pomodoro')

  useEffect(() => {
    setTimer(date.printFromSeconds(duration - elapsedTime))
  }, [duration, elapsedTime])

  useEffect(() => {
    document.title = `${timer} | Pomodoro`
  }, [timer])

  return <span className="font-mono text-7xl sm:text-9xl md:text-12xl">{timer}</span>
}

export default Timer
