import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.output.css'
import Pomodoro from './containers/Pomodoro'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Pomodoro />, document.getElementById('root') as HTMLElement)

serviceWorker.register()
