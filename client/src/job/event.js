import axios from 'axios'
import { setAlert } from './alert'
import { USER_LOADED } from './types' 

// post an event
export const postEvent = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/event', formData, config)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(setAlert('Event Posted', ''))
    } 
    catch (err) {
        const errors = err.response.data.errors
        console.log(errors)
        dispatch(setAlert('There was an error', ''))
    }
}

//  Search for events
// export const searchEvent = (key, type) => async dispatch => {
    
// } 