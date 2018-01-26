import axios from 'axios'

const GET_MESSAGES = 'GET_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
const CREATE_MESSAGE = 'CREATE_MESSAGE'

const defaultMessages = []

const getMessages = msgs => ({ type: GET_MESSAGES, msgs})
const postMessage = msg => ({ type: SEND_MESSAGE, msg})
const createMsg = msg => ({ type: CREATE_MESSAGE, msg})

export const updateMessages = valObj => ({ type: UPDATE_MESSAGES, valObj})

export const saveMessage = msg =>
    dispatch =>
        axios.post('/api/message', { msg })
            .then(res => {
                dispatch(postMessage(res.data))
            })

export const getUserMessages = () =>
    dispatch =>
        axios.get(`/api/message`)
            .then(res => {
                dispatch(getMessages(res.data.reverse()))
            })

export const sendMessage = msgObject =>
    dispatch =>
        axios.post('/api/sms/send', msgObject)
            .then(res => {
                dispatch(postMessage(res.data))
            })

export const createMessage = () =>
    dispatch =>
        axios.post('/api/message/new').then(res => {
            console.log(res.data)
            dispatch(createMsg(res.data))
        })


export default function (state = defaultMessages, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return action.msgs
        case SEND_MESSAGE:
            return state
        case UPDATE_MESSAGES:
            return state.map(msg => {
                let name = action.valObj.name.replace(action.valObj.id, '')
                if (action.valObj.id === msg.id) return {...msg, [name]: action.valObj.value}
                return msg
            })
        case CREATE_MESSAGE:
            state.unshift(action.msg)
            return state.slice(0)
        default:
            return state
    }
}
