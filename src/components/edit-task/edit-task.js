import React, { useState } from 'react'
import PropTypes from 'prop-types'

function EditTask({ task: { text, id }, onItemEditing }) {
  const [value, setValue] = useState(text)

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemEditing(value, id)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={value} onChange={onValueChange} />
    </form>
  )
}

EditTask.defaultProps = {
  onItemEditing: () => {},
}

EditTask.propTypes = {
  onItemEditing: PropTypes.func,
  task: PropTypes.object.isRequired,
}

export default EditTask
