import React, { PureComponent } from 'react'
import { ReactComponent as GithubIcon } from 'src/assets/img/github.svg'

class Footer extends PureComponent {
  render() {
    return (
      <div className="flex items-center mt-12 mb-8 space-x-8 text-sm">
        <p>
          Made by{' '}
          <a href="https://estevanmaito.me" target="_blank" rel="noopener noreferrer">
            Estevan Maito
          </a>
        </p>
        <a
          href="https://github.com/estevanmaito/pomodoro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          <GithubIcon />
        </a>
      </div>
    )
  }
}

export default Footer
