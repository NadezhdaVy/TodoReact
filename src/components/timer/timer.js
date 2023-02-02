import React from 'react'
import PropTypes from 'prop-types'

import './timer.css'

export default class Timer extends React.Component {
  static defaultProps = {
    startTimer: () => {},
  }

  static propTypes = {
    startTimer: PropTypes.func,
  }

  timerID = null

  state = { seconds: this.props.timer, time: {} }

  componentDidMount() {
    const { seconds } = this.state

    const timeLeft = this.convertToTime(seconds)
    this.setState({ time: timeLeft })
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  playTimer = () => {
    if (!this.timerID && this.state.seconds > 0) {
      this.timerID = setInterval(() => this.countDown(), 1000)
    }
  }

  stopTimer = () => {
    clearInterval(this.timerID)
    this.props.startTimer(this.props.id, this.state.seconds)
    this.timerID = null
  }

  countDown = () => {
    const sec = this.state.seconds
    const seconds = sec - 1
    this.setState({ seconds, time: this.convertToTime(seconds) })

    if (seconds === 0) {
      clearInterval(this.timerID)
    }
  }

  convertToTime = (sec) => {
    const minutes = Math.floor(sec / 60)

    const seconds = Math.ceil(sec % 60)

    const obj = {
      m: minutes,
      s: seconds,
    }
    return obj
  }

  render() {
    return (
      <div>
        {this.state.seconds === 0 ? null : (
          <span className="description">
            <button label="btn" type="button" className="icon icon-play" onClick={() => this.playTimer()} />
            <button
              label="btn"
              type="button"
              className="icon icon-pause"
              onClick={() => this.stopTimer(this.props.id)}
            />

            {`${this.state.time.m} : ${this.state.time.s}`}
          </span>
        )}
      </div>
    )
  }
}
