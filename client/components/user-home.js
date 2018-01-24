import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessage, updateUrl} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, msg, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate, handleUrlUpdate} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
        <form onSubmit={handleMessageSubmit.bind(null, msg)} name="messageSubmit">
          <div>
            <label htmlFor="message"><small>Message</small></label>
            <input type="text" name="text" value={msg.text || ''} onChange={handleMessageUpdate} />
            <label htmlFor="message"><small>Media Url</small></label>
            <input type="text" name="url" value={msg.url || ''} onChange={handleUrlUpdate} />
          </div>
          <button type="submit">Save</button>
        </form>
        <form onSubmit={handlePhoneSubmit} name="phoneSubmit">
          <div>
            <label htmlFor="send"><small>Send Message To Subscribers</small></label>
            <input type="text" name="phone_msg" />
            <label htmlFor="message"><small>Media Url</small></label>
            <input type="text" name="phone_url" />
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
      const text = evt.target.text.value
      const url = evt.target.url.value
      const newMessage = {...msg, text, url}
      dispatch(message(newMessage))
    },
    handlePhoneSubmit (evt) {
      evt.preventDefault()
      const text = evt.target.phone_msg.value
      const url = evt.target.phone_url.value
      dispatch(sendMessage({text, url}))
    },
    handleMessageUpdate(evt) {
      dispatch(updateMessage(evt.target.value))
    },
    handleUrlUpdate(evt) {
      dispatch(updateUrl(evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  msg: PropTypes.object,
}
