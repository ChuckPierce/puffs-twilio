import axios from 'axios'

const GET_MESSAGE = 'GET_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

const defaultMessage = {}

const getMessage = msg => ({ type: GET_MESSAGE, msg})
const postMessage = msg => ({ type: SEND_MESSAGE, msg})

export const updateMessage = value => ({ type: UPDATE_MESSAGE, value})

export const message = msg =>
    dispatch =>
        axios.post('/api/message', { msg })
            .then(res => {
                dispatch(getMessage(res.data))
            })

export const getUserMessage = messageId =>
    dispatch =>
        axios.get(`/api/message/${messageId}`)
            .then(res => {
                dispatch(getMessage(res.data))
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
            return action.msg
        case SEND_MESSAGE:
            return action.phoneNumber
        case UPDATE_MESSAGE:
            return {...state, text: action.value}
        default:
            return state
    }
}
