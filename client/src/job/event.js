import axios from 'axios'
import { setAlert } from './alert'

export const postEvent = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/event', formData, config)
        dispatch(setAlert('Event Posted', ''))
    } 
    catch (err) {
        const errors = err.response.data.errors
        console.log(errors)
        dispatch(setAlert('There was an error', ''))
    }
}