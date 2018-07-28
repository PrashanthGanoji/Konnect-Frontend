import { combineReducers } from 'redux';
import authReducer from './reducer_auth';
import errorsReducer from './reducer_errors'
import profileReducer from './reducer_profile';
import profileShownReducer from './reducer_profileshown'
import postsReducer from './reducer_posts'

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    currentProfile: profileReducer,
    profileShown: profileShownReducer,
    posts: postsReducer
});
  
export default rootReducer;