import api from '../utils/api'
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types'

import { setAlert } from './alert'

// load user
export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } 
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register the user
export const register = ({ name, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await api.post('/users', body)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) dispatch(setAlert(errors[0].msg))

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// login user
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password })

    try {
        const res = await api.post('/auth', body)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) dispatch(setAlert(errors[0].msg))

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// logout
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
}