import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios'
import setJwtToken from '../utils/set_jwt_token'
import * as jwt_decode from 'jwt-decode';
import {clearCurrentProfile} from './profile_actions'

export const registerUser = (data, history) => {
    return function (dispatch) {
        axios.post('/api/users', data)
            .then((res) => {
                console.log(res.data);
                history.push('/login')
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

export const loginUser = data => {
    return function (dispatch) {
        axios.post('/api/login', data)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setJwtToken(token);
            const decoded = jwt_decode(token);
            console.log(decoded)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    }
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setJwtToken(false)
    dispatch(setCurrentUser({}))
    dispatch(clearCurrentProfile())
}

export const clearErrors = () => dispatch =>{
    return dispatch({
        type: GET_ERRORS,
        payload: {}
    })
}