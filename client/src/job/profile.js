import api from '../utils/api'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types'

// get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } 
    catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// create or update the profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const res = await api.post('/profile', formData)

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))
        if(!edit) 
            history.push('/profile')
    }
    catch (err) {
        const errors = err.response.data.errors
        console.log(errors)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add experience
export const addExperience = (formData) => async dispatch => {

    try {
        const res = await api.put('/profile/experience', formData)

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added', ''))

    }
    catch (err) {
        const errors = err.response.data.errors
        console.log(errors)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add education
export const addEducation = (formData) => async dispatch => {

    try {
        const res = await api.put('/profile/education', formData)

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added', ''))
    }
    catch (err) {
        const errors = err.response.data.errors
        console.log(errors)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}