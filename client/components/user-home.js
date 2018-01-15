import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, handleMessageSubmit} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
        <form onSubmit={handleMessageSubmit} name="messageSubmit">
          <div>
            <label htmlFor="message"><small>Message</small></label>
            <input type="text" name="text" />
          </div>
          <button type="submit">Save</button>
        </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleMessageSubmit (evt) {
      evt.preventDefault()
      const input = evt.target.text
      dispatch(message(input.value))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
