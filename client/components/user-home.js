import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessage} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, msg, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
        <form onSubmit={handleMessageSubmit.bind(null, msg)} name="messageSubmit">
          <div>
            <label htmlFor="message"><small>Message</small></label>
            <input type="text" name="text" value={msg.text || ''} onChange={handleMessageUpdate}/>
          </div>
          <button type="submit">Save</button>
        </form>
        <form onSubmit={handlePhoneSubmit} name="phoneSubmit">
          <div>
            <label htmlFor="send"><small>Send To Phone Number</small></label>
            <input type="text" name="phone"/>
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
    email: state.user.email,
    msg: state.message,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleMessageSubmit (msg, evt) {
      evt.preventDefault()
      const input = evt.target.text
      const newMessage = {...msg, text: input.value}
      dispatch(message(newMessage))
    },
    handlePhoneSubmit (evt) {
      evt.preventDefault()
      const input = evt.target.phone
      dispatch(sendMessage(input.value))
    },
    handleMessageUpdate(evt) {
      dispatch(updateMessage(evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  message: PropTypes.string,
}
