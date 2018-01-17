import axios from 'axios'

const GET_MESSAGE = 'GET_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'

const defaultMessage = ''

const getMessage = text => ({ type: GET_MESSAGE, text})
const postMessage = text => ({ type: SEND_MESSAGE, text})

export const message = text =>
    dispatch =>
        axios.post('/api/message', { text })
            .then(res => {
                dispatch(getMessage(res.data.text))
            })
export const sendMessage = phoneNumber =>
    dispatch =>
        axios.post('/api/sms/send', { phoneNumber })
            .then(res => {
                dispatch(postMessage(res.data.phoneNumber))
            })


export default function (state = defaultMessage, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return action.text
        case SEND_MESSAGE:
            return action.phoneNumber
        default:
            return state
    }
}
