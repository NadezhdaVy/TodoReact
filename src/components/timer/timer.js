import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './timer.css'

function Timer({ timer, startTimer, id }) {
  const [seconds, setSeconds] = useState(timer)
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState({})

  const convertToTime = (sec) => {
    const minutes = Math.floor(sec / 60)

    const second = Math.ceil(sec % 60)

    setTime({ m: minutes, s: second })
  }

  useEffect(() => {
    if (seconds > 0) {
      convertToTime(seconds)
    }
  }, [seconds])

  useEffect(() => {
    let interval = null
    if (isActive && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1)
      }, 1000)
    } else if (seconds === 0) {
      clearInterval(interval)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => {
      startTimer(id, seconds)
      clearInterval(interval)
    }
  }, [isActive, seconds])

  const playTimer = () => {
    setIsActive(true)
  }
  const stopTimer = () => {
    setIsActive(false)
  }

  return (
    <div>
      {seconds === 0 ? null : (
        <span className="description">
          <button label="btn" type="button" className="icon icon-play" onClick={() => playTimer()} />
          <button label="btn" type="button" className="icon icon-pause" onClick={() => stopTimer()} />

          {`${time.m} : ${time.s}`}
        </span>
      )}
    </div>
  )
}

Timer.defaultProps = {
  startTimer: () => {},
}

Timer.propTypes = {
  startTimer: PropTypes.func,
}

export default Timer
