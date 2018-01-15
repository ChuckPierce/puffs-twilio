import axios from 'axios'
import history from '../history'

const GET_MESSAGE = 'GET_MESSAGE'

const defaultMessage = ''

const getMessage = text => ({ type: GET_MESSAGE, text})

export const message = text =>
    dispatch =>
        axios.post('/api/message', { text })
            .then(res => {
                dispatch(getMessage(res.data.text))
            })


export default function (state = defaultMessage, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return action.text
        default:
            return state
    }
}
