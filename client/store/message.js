import axios from 'axios'

const GET_MESSAGE = 'GET_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_URL = 'UPDATE_URL'
const UPDATE_PRIMARY = 'UPDATE_PRIMARY'

const defaultMessage = {}

const getMessage = msg => ({ type: GET_MESSAGE, msg})
const postMessage = msg => ({ type: SEND_MESSAGE, msg})

export const updateMessage = value => ({ type: UPDATE_MESSAGE, value})
export const updateUrl = value => ({ type: UPDATE_URL, value})
export const updatePrimary = value => ({ type: UPDATE_PRIMARY, value})

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

export const sendMessage = msgObject =>
    dispatch =>
        axios.post('/api/sms/send', msgObject)
            .then(res => {
                dispatch(postMessage(res.data))
            })


export default function (state = defaultMessage, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return action.msg
        case SEND_MESSAGE:
            return action.msg
        case UPDATE_MESSAGE:
            return {...state, text: action.value}
        case UPDATE_URL:
            return {...state, url: action.value}
        case UPDATE_PRIMARY:
            return {...state, primary: action.value}
        default:
            return state
    }
}
