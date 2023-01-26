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

  timerID = 0

  state = { seconds: this.props.timer, time: {} }

  componentDidMount() {
    const { seconds } = this.state
    const timeLeft = this.convertToTime(seconds)
    this.setState({ time: timeLeft })
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  playTimer = () => {
    if (this.timerID === 0 && this.state.seconds > 0) {
      this.timerID = setInterval(() => this.countDown(), 1000)
    }
  }

  stopTimer = () => {
    clearInterval(this.timerID)
    this.timerID = 0
  }

  countDown = () => {
    const sec = this.state.seconds
    const seconds = sec - 1
    this.setState({ seconds, time: this.convertToTime(seconds) })
    this.props.startTimer(this.props.id, seconds)
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
        {this.props.timer === 0 ? null : (
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
