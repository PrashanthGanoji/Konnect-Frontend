import { GET_POSTS_LIST, GET_POST,POST_LOADING } from '../actions/types'

const initialState = {
    postsList: null,
    postDetail: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_POST:
            return{
                ...state,
                postDetail : action.payload,
                loading:false
            }
        case POST_LOADING:
            return{
                ...state,
                loading:action.payload
            }
        case GET_POSTS_LIST:
            return{
                ...state,
                postsList: action.payload,
                loading:false
            }
        default:
            return state;
    }
}