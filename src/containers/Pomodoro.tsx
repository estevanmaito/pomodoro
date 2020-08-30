import React, { Component } from 'react'
import Timer from '../components/Timer'
import Controls from '../components/Controls'
import History from '../components/History/History'
import Footer from '../components/Footer'

import DB from '../helpers/localStorage'
import formatDate from '../helpers/formatDate'

import bell from '../assets/audio/bell.mp3'

interface Props {}

interface State {
  pomodoros: Array<{ type: string; name: string; id: number; duration: number; started?: string }>
  showHistory: boolean
  hasStarted: boolean
  currentPomodoro: number
  elapsedTime: number
  interval: number | undefined
  allPomodorosMade: []
}

class Pomodoro extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      pomodoros: POMODOROS,
      showHistory: false,
      hasStarted: false,
      currentPomodoro: 0,
      elapsedTime: 0,
      interval: undefined,
      allPomodorosMade: [],
    }
  }

  // For some reason, Chrome won't play the bell or create the Audio object
  // until the pomodoro tab is focused, for the first time
  audio = new Audio(bell)

  componentDidMount = () => {
    this.setState({
      allPomodorosMade: DB.getAllTimePomodoros(),
    })
  }

  componentWillUnmount = () => {
    window.clearInterval(this.state.interval)
  }

  handleHistoryVisibility = () => {
    this.setState((state) => {
      return { showHistory: !state.showHistory }
    })
  }

  handleStartStopTimer = () => {
    if (this.state.hasStarted) {
      if (window.confirm('This will stop and reset the CURRENT timer. Are you sure?'))
        this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  handleResetTimer = () => {
    if (window.confirm('This will STOP and CLEAR all current pomodoros. Are you sure?'))
      this.resetTimer()
  }

  startTimer = () => {
    const interval = window.setInterval(() => {
      // if timer reached 0, load next pomodoro
      if (this.state.elapsedTime === this.state.pomodoros[this.state.currentPomodoro].duration) {
        return this.nextPomo()
      }
      this.setState((state) => {
        return { elapsedTime: state.elapsedTime + 1 }
      })
    }, 1000)

    this.savePomodoro()
    this.setState({ interval, hasStarted: true })
  }

  stopTimer = () => {
    clearInterval(this.state.interval)
    this.setState((state) => {
      return {
        pomodoros: state.pomodoros.map((pomo, i) => {
          if (i === state.currentPomodoro) {
            return {
              ...pomo,
              started: undefined,
            }
          }
          return pomo
        }),
        elapsedTime: 0,
        interval: undefined,
        hasStarted: false,
      }
    })
  }

  resetTimer = () => {
    clearInterval(this.state.interval)
    this.setState({
      pomodoros: POMODOROS,
      hasStarted: false,
      elapsedTime: 0,
      interval: undefined,
      currentPomodoro: 0,
    })
  }

  nextPomo = () => {
    this.alert()
    // last pomodoro
    if (this.state.pomodoros.length - 1 === this.state.currentPomodoro) {
      return this.resetTimer()
    }

    this.setState((state) => {
      return {
        elapsedTime: 0,
        currentPomodoro: state.currentPomodoro + 1,
      }
    })
    this.savePomodoro()
  }

  // TODO: add notifications API
  alert = () => {
    this.audio.play()
  }

  savePomodoro = () => {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro]
    const now = Date.now()
    let allPomodorosMade: [] = []

    // Only count a finished Pomodoro if it has moved to a break
    // and the timer is still running (hasStarted)
    // hasStarted prevents it from creating a new record on a restart
    // from a break
    if (currentPomodoro.type !== 'pomodoro' && this.state.hasStarted) {
      DB.create('pomodoro', now)
      allPomodorosMade = DB.getAllTimePomodoros()
    }

    this.setState((state) => {
      return {
        pomodoros: state.pomodoros.map((pomo, i) => {
          if (i === state.currentPomodoro) {
            return {
              ...pomo,
              started: formatDate.printFromDateObject('hh:mm', now),
            }
          }
          return pomo
        }),
        allPomodorosMade: allPomodorosMade.length > 0 ? allPomodorosMade : state.allPomodorosMade,
      }
    })
  }

  render() {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro]
    const activeState = 'font-semibold text-gray-700 px-2 py-1'
    const inactiveState = 'font-semibold text-gray-300 px-2 py-1'

    return (
      <div className="flex flex-col items-center justify-center max-w-lg min-h-screen py-8 mx-auto text-gray-700">
        <div className="mt-8 space-x-4">
          <span className={currentPomodoro.type === 'pomodoro' ? activeState : inactiveState}>
            Pomodoro
          </span>
          <span className={currentPomodoro.type === 'pomodoro' ? inactiveState : activeState}>
            Break
          </span>
        </div>
        <Timer duration={currentPomodoro.duration} elapsedTime={this.state.elapsedTime} />
        <Controls
          hasStarted={this.state.hasStarted}
          handleStartStopTimer={this.handleStartStopTimer}
          handleResetTimer={this.handleResetTimer}
          showHistory={this.handleHistoryVisibility}
        />
        {this.state.showHistory && (
          <History pomos={this.state.pomodoros} allPomodorosMade={this.state.allPomodorosMade} />
        )}
        <Footer />
      </div>
    )
  }
}

export default Pomodoro

const POMODOROS = [
  { type: 'pomodoro', name: 'Pomodoro', id: 1, duration: 1500 },
  { type: 'break', name: 'Short break', id: 2, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 3, duration: 1500 },
  { type: 'break', name: 'Short break', id: 4, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 5, duration: 1500 },
  { type: 'break', name: 'Short break', id: 6, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 7, duration: 1500 },
  { type: 'break', name: 'Long break', id: 8, duration: 900 },
]
