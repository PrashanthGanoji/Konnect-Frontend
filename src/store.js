import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index' //no need of specifying index

const middleware = [thunk];

//create state takes three params 1. rootReducer, initial state, and middleware to be applied


//setting up redux chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;