import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessage, updateUrl, updatePrimary} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, msg, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate} = props
  return (
    <div>
        <form onSubmit={handleMessageSubmit.bind(null, msg)} name="messageSubmit">
          <div>
            <div>
              <label htmlFor="message"><small>Message</small></label>
              <textarea name="text" value={msg.text || ''} onChange={handleMessageUpdate} />
            </div>
            <div>
              <label htmlFor="message"><small>Media Url</small></label>
              <input type="text" name="url" value={msg.url || ''} onChange={handleMessageUpdate} />
            </div>
            <div>
              <label htmlFor="keyword"><small>Keyword</small></label>
              <input type="keyword" name="keyword" value={msg.keyword || ''} onChange={handleMessageUpdate} />
            </div>
              <div>
              <label><small>Primary Message</small></label>
              <small>Yes</small> <input type="radio" name="primary_yes" value="primary_yes" checked={!!msg.primary} onChange={handleMessageUpdate} />
              <small> No</small> <input type="radio" name="primary_no" value="primary_no" checked={!msg.primary} onChange={handleMessageUpdate} />
            </div>
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
      const target = evt.target
      const value = target.type === 'radio' ? target.name === 'primary_yes' : target.value
      const name = target.type === 'radio' ? 'primary' : target.name
      console.log({ value, name })
      dispatch(updateMessage({ value, name }))
    },
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
