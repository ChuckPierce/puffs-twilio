import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessage, updateUrl, updatePrimary} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, msg, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate, handleUrlUpdate, handlePrimaryChange} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
        <form onSubmit={handleMessageSubmit.bind(null, msg)} name="messageSubmit">
          <div>
            <label htmlFor="message"><small>Message</small></label>
            <input type="text" name="text" value={msg.text || ''} onChange={handleMessageUpdate} />
            <label htmlFor="message"><small>Media Url</small></label>
            <input type="text" name="url" value={msg.url || ''} onChange={handleUrlUpdate} />
            <label><small>Primary Message</small></label>
            Yes <input type="radio" name="primary_yes" value={msg.primary} checked={msg.primary} onChange={handlePrimaryChange.bind(null, true)} />
            No <input type="radio" name="primary_no" value={!msg.primary} checked={!msg.primary} onChange={handlePrimaryChange.bind(null, false)} />
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
    },
    handlePrimaryChange(val) {
      dispatch(updatePrimary(val))
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
