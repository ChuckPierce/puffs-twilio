import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {message, sendMessage, updateMessages} from '../store'
import ResponseForm from './message-form'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {messages, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate} = props
  return (
    <div className="formContainer">
        <h4>Response message</h4>
        {messages.map(msg => {
          console.log(msg)
          return <ResponseForm key={msg.id} onSubmit={handleMessageSubmit} onUpdate={handleMessageUpdate} message={msg} />
        })}
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
    messages: state.messages,
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
    handleMessageUpdate(id, evt) {
      const target = evt.target
      const value = target.type === 'radio' ? target.name === 'primary_yes' : target.value
      const name = target.type === 'radio' ? 'primary' : target.name
      dispatch(updateMessages({ value, name, id }))
    },
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  messages: PropTypes.array,
}
