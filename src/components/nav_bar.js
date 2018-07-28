import React, { Component } from 'react';
import logoblack from '../img/klogo-black.png'
import logowhite from '../img/klogo-white.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth_actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profile_actions';
import isEmpty from '../utils/is_empty';

class Navbar extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        this.props.logoutUser()
        this.props.history.push('/')
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated)
            this.props.getCurrentProfile()
    }

    render() {
        const { auth } = this.props
        const populateLinks = () => {
            if (auth.isAuthenticated)
                return (
                    <React.Fragment>
                        <li><Link to='/posts'>Posts</Link></li>
                        {this.props.currentProfile.selectedProfile && !isEmpty(this.props.currentProfile.selectedProfile)?<li><Link to={`/profile/${this.props.currentProfile.selectedProfile.handel}`}>Profile</Link></li>:''}
                        <li><a href="#" onClick={this.handleLogout}><span>Logout</span></a></li>
                        <li className="active"><Link to='/dashboard'>{auth.user.username}</Link></li>
                    </React.Fragment>
                )
            else {
                return (
                    <React.Fragment>
                        <li><Link to="/login"><span>Login</span></Link></li>
                        <li><Link to="/signup"><span>Sign up</span></Link></li>
                    </React.Fragment>
                )
            }
        }

        return (
            <header className="header--section style--1">
                <div className="header--navbar navbar bg-black" data-trigger="sticky">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle style--1 collapsed" data-toggle="collapse" data-target="#headerNav">
                                <span className="sr-only">Toggle Navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="header--navbar-logo navbar-brand">
                                <Link to={auth.isAuthenticated?"/dashboard":'/'}>
                                    <img src={logowhite} className="normal" alt="" />
                                    <img src={logoblack} className="sticky" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div id="headerNav" className="navbar-collapse collapse float--right">
                            <ul className="header--nav-links style--1 nav ff--primary">
                                <li><Link to='/profile_list'>People</Link></li>
                                {populateLinks()}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentProfile: state.currentProfile
    }
}

function mapDispatchToProps(dispatch) {
    //Whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({ logoutUser: logoutUser, getCurrentProfile:getCurrentProfile }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));