import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, handleMessageSubmit, handlePhoneSubmit} = props
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
        <form onSubmit={handlePhoneSubmit} name="phoneSubmit">
          <div>
            <label htmlFor="send"><small>Send To Phone Number</small></label>
            <input type="text" name="phone" />
          </div>
          <button type="submit">Send</button>
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
    },
    handlePhoneSubmit (evt) {
      evt.preventDefault()
      const input = evt.target.phone
      dispatch(sendMessage(input.value))
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
