import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getCurrentProfile,deleteProfile} from '../../actions/profile_actions'
import Spinner from '../common/spinner'
import DashboardLinks from './dashboard_links';
import Education from './education';
import Experience from './experience';
import ProfileInfo from './profile_info';

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login')
        }
        this.props.getCurrentProfile()
    }

    handleDeleteProfile = () =>{
        this.props.deleteProfile(this.props.history)
    }
    render() {
        const { user } = this.props.auth;
        const { selectedProfile, loading } = this.props.currentProfile

        let content = '';

        if (loading || selectedProfile == null) {
            content = <Spinner />
        }
        else {
            if (Object.keys(selectedProfile).length > 0) {
                content =
                    <React.Fragment>
                        <h2 className="title fw--600">Welcome {user.username}</h2>
                        <DashboardLinks selectedProfile={selectedProfile}/>
                        <ProfileInfo profile={selectedProfile}/>
                        <Education education={selectedProfile.education_set} />
                        <Experience experience={selectedProfile.experience_set} />
                        <button onClick={this.handleDeleteProfile} className="btn btn-danger mt--30 mb--50">Delete Profile</button>
                    </React.Fragment>
            }
            else
               return <Redirect to='/create_profile'/>
        }
        return (
            <div className="container">
                {content}
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    currentProfile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentProfile: state.currentProfile
    }
}

function mapDispatchToProps(dispatch) {
    //Whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({ getCurrentProfile: getCurrentProfile,
    deleteProfile: deleteProfile }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));