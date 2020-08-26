import React, { PureComponent } from 'react'
import click from 'src/assets/audio/click.mp3'

interface Props {
  handleStartStopTimer: () => void
  handleResetTimer: () => void
  showHistory: () => void
  hasStarted: boolean
}

class Controls extends PureComponent<Props> {
  audio = new Audio(click)

  handleClick = (fn: () => void): void => {
    this.audio.play()
    fn()
  }

  render() {
    const { handleStartStopTimer, handleResetTimer, hasStarted, showHistory } = this.props

    return (
      <div className="grid max-w-sm grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <button
            className="p-4 bg-orange-400 rounded-full focus:outline-none"
            style={
              hasStarted
                ? {
                    boxShadow:
                      '#777 0px 0px 1px 1px, rgb(100, 100, 100) 0px 2px 7px -3px, rgb(100, 100, 100) 0px 3px 5px -4px, rgb(255, 191, 156) 0px 1px 3px 2px inset, rgb(122, 76, 50) 0px 0px 3px 2px inset',
                  }
                : {
                    boxShadow:
                      '#777 0px 0px 1px 1px, rgb(100,100,100) 0px 7px 7px -3px, rgb(100,100,100) 0px 4px 5px -4px, rgb(255, 191, 156) 0px 2px 3px 2px inset, rgb(122, 76, 50) 0px 0px 3px 2px inset',
                  }
            }
            onClick={() => this.handleClick(handleStartStopTimer)}
            title="Start/Stop"
          ></button>
          <span className="block mt-2 text-xs lowercase">{hasStarted ? 'Stop' : 'Start'}</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="p-4 bg-gray-300 rounded-full focus:outline-none gray-button"
            onClick={() => this.handleClick(handleResetTimer)}
            title="Reset timer"
          ></button>
          <span className="block mt-2 text-xs lowercase">Reset</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="p-4 bg-gray-300 rounded-full focus:outline-none gray-button"
            onClick={() => this.handleClick(showHistory)}
            title="History"
          ></button>
          <span className="block mt-2 text-xs lowercase">History</span>
        </div>
      </div>
    )
  }
}

export default Controls
