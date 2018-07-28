import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const PrivateRoute = ({component :Component, auth, ...rest}) =>{
    return <Route 
    {...rest}
    render = {props => auth.isAuthenticated == true?(
        <Component {...props} />
    ) : (
        <Redirect to = '/login' />
    )} />
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(PrivateRoute);