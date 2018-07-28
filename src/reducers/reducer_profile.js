import { GET_PROFILE, PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ALL_PROFILES } from '../actions/types'

const initialState = {
    selectedProfile: null,
    profiles: null,
    loading: false
}

export default function(state = initialState, action){
    console.log(action)
    switch(action.type){
        case GET_PROFILE:
            return{
                ...state,
                selectedProfile : action.payload,
                loading:false
            }
        case PROFILE_LOADING:
            return{
                ...state,
                loading:action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                selectedProfile: null
            }
        case GET_ALL_PROFILES:
            return{
                ...state,
                profiles: action.payload,
                loading:false
            }
        default:
            return state;
    }
}