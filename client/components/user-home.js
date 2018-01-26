import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {saveMessage, sendMessage, updateMessages, createMessage, deleteMessage} from '../store'
import ResponseForm from './message-form'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {messages, handleMessageSubmit, handlePhoneSubmit, handleMessageUpdate, handleCreateClick, handleDelete} = props

  return (
    <div className="formContainer">
        <button className="btn btn-primary mb-5" onClick={handleCreateClick}>+ Create New Response</button>
        {messages.map((msg, i) => {
          return (
            <div key={msg.id}>
              <div className="clearfix">
              <h4 className="float-left">Response message {messages.length - i}</h4>
              <button className="btn btn-danger btn-sm float-right" onClick={handleDelete.bind(null, msg.id)}>X</button>
              </div>
              <ResponseForm onSubmit={handleMessageSubmit} onUpdate={handleMessageUpdate} message={msg} />
            </div>
          )
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
      dispatch(saveMessage(msg))
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
    handleCreateClick(evt) {
      evt.preventDefault()
      dispatch(createMessage())
    },
    handleDelete(id, evt) {
      evt.preventDefault()
      dispatch(deleteMessage(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  messages: PropTypes.array,
}
