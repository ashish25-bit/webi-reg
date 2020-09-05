import api from '../utils/api'
import { setAlert } from './alert'
import { USER_LOADED } from './types' 

// post an event
export const postEvent = (formData) => async dispatch => {
    try {
        const res = await api.post('/event', formData)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(setAlert('Webinar Details Posted', ''))
    } 
    catch (err) {
        // const errors = err.response.data.errors
        dispatch(setAlert('There was an error', ''))
    }
}

// register for an event
export const register = (data) => dispatch => {
    dispatch({
        type: USER_LOADED,
        payload: data
    })
}