
import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ALL_PROFILES, GET_ERRORS, GET_PROFILE_SHOWN, GET_FRIENDS, GET_POSTS_LIST, GET_POST, POST_LOADING } from '../actions/types'
import isEmpty from '../utils/is_empty'

const ROOT_URL = "https://prashanth-konnect.herokuapp.com/"
// const ROOT_URL = 'http://127.0.0.1:8000/'

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get(ROOT_URL + 'api/profile')
        .then(profile => {
            console.log(profile)
            return dispatch({
                type: GET_PROFILE,
                payload: profile.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

export const getProfileShown = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(ROOT_URL + `api/profile/handel/${handle}`)
        .then(profile => {
            dispatch(setProfileLoading(false))
            console.log(profile)
            return dispatch({
                type: GET_PROFILE_SHOWN,
                payload: profile.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_PROFILE_SHOWN,
                payload: {}
            })
        })
}

export const unloadProfileShown = () => dispatch => {
    return dispatch({
        type: GET_PROFILE_SHOWN,
        payload: null
    })
}


export const setProfileLoading = (value = true) => {
    return {
        type: PROFILE_LOADING,
        payload: value
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post(ROOT_URL + 'api/profile', profileData)
        .then(profile => {
            console.log(profile)
            dispatch(getCurrentProfile())
            history.push('/dashboard')
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            )
        })
}

export const editProfile = (profileData, history) => dispatch => {
    axios.put(ROOT_URL + 'api/profile', profileData)
        .then(profile => {
            console.log(profile)
            history.push('/dashboard')
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deleteProfile = () => dispatch => {
    if (window.confirm("Are you sure you want to your Account?\nThis cannot be undone!")) {
        axios.delete(ROOT_URL + 'api/profile')
            .then(() => {
                console.log('deleted Successfully');
                return dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })
            })
            .catch(err => {
                console.log("error deleting", err)
                return dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }
                )
            })
    }
}

export const addEdu = (eduData, history) => dispatch => {
    axios.post(ROOT_URL + 'api/profile/edu', eduData)
        .then(edu => {
            console.log(edu)
            history.push('/dashboard')
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const addExp = (expData, history) => dispatch => {
    axios.post(ROOT_URL + 'api/profile/exp', expData)
        .then(exp => {
            console.log(exp)
            history.push('/dashboard')
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deleteEdu = (id) => dispatch => {
    axios.delete(ROOT_URL + `api/profile/edu/${id}`)
        .then(exp => {
            console.log(`deleted edu with id ${id}`)
            dispatch(getCurrentProfile())
        })
        .catch(err => {
            console.log(`couldn't delete edu`)
        })
}

export const deleteExp = (id) => dispatch => {
    axios.delete(ROOT_URL + `api/profile/exp/${id}`)
        .then(exp => {
            console.log(`deleted exp with id ${id}`)
            dispatch(getCurrentProfile())
        })
        .catch(err => {
            console.log(`couldn't delete exp`)
        })
}

export const getAllProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get(ROOT_URL + 'api/profile/all')
        .then(profiles => {
            console.log(profiles.data)
            return dispatch({
                type: GET_ALL_PROFILES,
                payload: profiles.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_ALL_PROFILES,
                payload: {}
            })
        })
}

export const getAllProfilesWithParams = (query) => dispatch => {
    dispatch(setProfileLoading())

    let url = ROOT_URL + 'api/profile/all'
    if (!isEmpty(query))
        url = `${url}${query}`

    console.log(url)
    axios.get(url)
        .then(profiles => {
            console.log(profiles)
            return dispatch({
                type: GET_ALL_PROFILES,
                payload: profiles.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_ALL_PROFILES,
                payload: {}
            })
        })
}

export const clearAllProfiles = () => dispatch => {
    return dispatch({
        type: GET_ALL_PROFILES,
        payload: null
    })
}

export const addFriend = (id) => dispatch => {
    axios.post(ROOT_URL + `api/profile/friends/${id}`)
        .then(res => {
            console.log(`friend with ${id} added`)
            dispatch(getCurrentProfile())
        })
        .catch(err => {
            console.log(`couldn't add friend`)
        })
}

export const unFriend = (id) => dispatch => {
    axios.delete(ROOT_URL + `api/profile/friends/${id}`)
        .then(res => {
            console.log(`friend with ${id} deleted`)
            dispatch(getCurrentProfile())
        })
        .catch(err => {
            console.log(`couldn't add friend`)
        })
}

export const getFriends = (id) => dispatch => {
    axios.get(ROOT_URL + `api/profile/getfriends/${id}`)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_FRIENDS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_FRIENDS,
                payload: []
            })
        })
}

//POSTS ACTIONS

export const getPosts = (handel) => dispatch => {
    dispatch(setPostsLoading())
    axios.get(ROOT_URL + `api/profile/${handel}/posts`)
        .then(posts => {
            console.log(posts)
            return dispatch({
                type: GET_POSTS_LIST,
                payload: posts.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_POSTS_LIST,
                payload: []
            })
        })
}

export const setPostsLoading = (value = true) => {
    return {
        type: POST_LOADING,
        payload: value
    }
}

export const deletePost = (id, handel) => dispatch => {
    if (window.confirm('Are you sure you want to delete this post? This cannot be undone!!'))
        axios.delete(ROOT_URL + `api/profile/delete_post/${id}`)
            .then(res => {
                console.log(`post with ${id} deleted`)
                dispatch(getPosts(handel))
            })
            .catch(err => {
                console.log(`couldn't delete the post`)
            })
}

export const getPostDetails = (id) => dispatch => {
    dispatch(setPostsLoading())
    axios.get(ROOT_URL + `api/profile/posts/${id}`)
        .then(posts => {
            console.log(posts)
            return dispatch({
                type: GET_POST,
                payload: posts.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_POST,
                payload: {}
            })
        })
}

export const createPost = (postData) => dispatch => {
    axios.post(ROOT_URL + 'api/profile/posts', postData)
        .then(post => {
            console.log(post)
            dispatch(getFeed())
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            )
        })
}

export const getFeed = () => dispatch => {
    dispatch(setPostsLoading())
    axios.get(ROOT_URL + `api/profile/posts`)
        .then(posts => {
            console.log(posts)
            return dispatch({
                type: GET_POSTS_LIST,
                payload: posts.data
            })
        })
        .catch(err => {
            return dispatch({
                type: GET_POSTS_LIST,
                payload: []
            })
        })
}

export const addComment = (id, postData) => dispatch => {
    axios.post(ROOT_URL + `api/profile/posts/${id}/comments`, postData)
        .then(post => {
            console.log(post)
            dispatch(getPostDetails(id))
            dispatch({
                type: GET_ERRORS,
                payload: {}
            }
            )
        })
        .catch(err => {
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            )
        })
}

export const likePost = (id) => dispatch => {
    axios.post(ROOT_URL + `api/profile/post/like/${id}`)
        .then(res => {
            console.log(`Like post ${id}`)
            dispatch(getFeed())
        })
        .catch(err => {
            console.log(`couldn't add friend`)
        })
} 