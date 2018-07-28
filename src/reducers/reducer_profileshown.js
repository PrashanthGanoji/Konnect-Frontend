import { GET_PROFILE_SHOWN,GET_FRIENDS } from '../actions/types'

const initialState = {
    profileshown: null,
    friends: null
}

export default function(state = initialState, action){
    console.log(action)
    switch(action.type){
        case GET_PROFILE_SHOWN:
            return{
                ...state,
                profileshown:action.payload
            }
        case GET_FRIENDS:
            return{
                ...state,
                friends: action.payload
            }
        default:
            return state;
    }
}