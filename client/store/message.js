import axios from 'axios'

const GET_MESSAGE = 'GET_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

const defaultMessage = {}

const getMessage = msg => ({ type: GET_MESSAGE, msg})
const postMessage = msg => ({ type: SEND_MESSAGE, msg})

export const updateMessage = valObj => ({ type: UPDATE_MESSAGE, valObj})

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
            return state
        case UPDATE_MESSAGE:
            return {...state, [action.valObj.name]: action.valObj.value}
        default:
            return state
    }
}
