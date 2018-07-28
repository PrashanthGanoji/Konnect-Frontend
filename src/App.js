import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as jwt_decode from 'jwt-decode';

import store from './store';
import Navbar from './components/nav_bar.js'
import Landing from './components/landing.js'
import Footer from './components/footer';
import SignUpForm from './components/auth/register'
import LoginForm from './components/auth/login'
import Dashboard from './components/dashboard/dashboard'
import PrivateRoute from './components/common/protected_route'
import ProfileForm from './components/profile/profile_form'
import EditProfileForm from './components/profile/edit_profile'
import EduForm from './components/profile/add_edu'
import ExpForm from './components/profile/add_exp'
import ProfileList from './components/profile/profile_list'
import ProfileDetails from './components/profileDetails/profile_detail'
import postDetails from './components/profileDetails/post_details';
import Feed from './components/profileDetails/feed'

import setJwtToken from './utils/set_jwt_token'
import { setCurrentUser, logoutUser } from './actions/auth_actions';


if (localStorage.jwtToken) {
  setJwtToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  console.log(decoded)
  const currentTime = Date.now() / 1000
  if (currentTime > decoded.exp) {
    console.log('inside expiry ')
    store.dispatch(logoutUser())

    window.location.href = '/login'
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="wrapper">
              <Route exact path='/' component={Landing} />
              <Route exact path='/signup' component={SignUpForm} />
              <Route exact path='/login' component={LoginForm} />
              <Route exact path='/profile_list'  component={ProfileList} />
              <Route exact path='/profile/:handle' component={ProfileDetails} />
              <Route exact path='/posts' component={Feed} />
              <Route exact path='/post/:id' component={postDetails} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create_profile' component={ProfileForm} />
                <PrivateRoute exact path='/edit_profile' component={EditProfileForm} />
                <PrivateRoute exact path='/add_edu' component={EduForm} />
                <PrivateRoute exact path='/add_exp' component={ExpForm} />
              </Switch>
            </div>
            <Footer />
            </div>
        </Router>
      </Provider>
        );
      }
    }
    
    export default App;
