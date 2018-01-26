import React from 'react'

const ResponseForm = (props) => {
    const { onSubmit, message, onUpdate} = props
    return (
        <form onSubmit={onSubmit.bind(null, message)} name="messageSubmit" className="mb-5">
          <div className="form-group">
            <label htmlFor="message">Text</label>
            <textarea className="form-control" name={`text${message.id}`} value={message.text || ''} onChange={onUpdate.bind(null, message.id)} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Media Url</label>
            <input className="form-control" type="text" name={`url${message.id}`} value={message.url || ''} onChange={onUpdate.bind(null, message.id)} />
          </div>
          <div className="form-group">
            <label htmlFor="keyword">Keyword</label>
            <input className="form-control" type="keyword" name={`keyword${message.id}`} value={message.keyword || ''} onChange={onUpdate.bind(null, message.id)} />
          </div>
            <button type="submit" className="btn btn-primary">Save response</button>
            {message.alert ? <span className="ml-3">{message.alert}</span> : null}
        </form>
    )
}

export default ResponseForm
