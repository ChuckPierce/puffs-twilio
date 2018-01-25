import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessage} from '../store'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {msg, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate} = props
  return (
    <div className="formContainer">
        <h4>Response message</h4>
        <form onSubmit={handleMessageSubmit.bind(null, msg)} name="messageSubmit" className="mb-5">
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" name="text" value={msg.text || ''} onChange={handleMessageUpdate} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Media Url</label>
            <input className="form-control" type="text" name="url" value={msg.url || ''} onChange={handleMessageUpdate} />
          </div>
          <div className="form-group">
            <label htmlFor="keyword">Keyword</label>
            <input className="form-control" type="keyword" name="keyword" value={msg.keyword || ''} onChange={handleMessageUpdate} />
          </div>
          <div className="form-group">
            <label>Primary Message</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="primary_yes" value="primary_yes" id="primary_yes" checked={!!msg.primary} onChange={handleMessageUpdate} />
              <label className="form-check-label" htmlFor="primary_yes">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="primary_no" value="primary_no" id="primary_no" checked={!msg.primary} onChange={handleMessageUpdate} />
              <label className="form-check-label" htmlFor="primary_no">
                No
              </label>
          </div>
          </div>
            <button type="submit" className="btn btn-primary">Save message</button>
        </form>
        <h4>Send a message</h4>
        <form onSubmit={handlePhoneSubmit} name="phoneSubmit">
          <div className="form-group">
            <label htmlFor="send">Message</label>
            <textarea className="form-control" name="phone_msg" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Media Url</label>
            <input className="form-control" type="text" name="phone_url" />
          </div>
          <button type="submit" className="btn btn-primary">Send message</button>
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
