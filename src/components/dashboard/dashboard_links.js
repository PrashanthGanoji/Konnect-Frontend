import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

class DashboardLinks extends Component {

    curLoc = (path) => {
        if (path === this.props.history.location.pathname)
            return true
        return false
    }

    render() {
        const { user } = this.props.auth
        const selectedProfile = this.props.selectedProfile
        return ( 
            <React.Fragment>
                <div className="filter--links float--left">
                    <ul className="nav ff--primary">
                        <li className={cx('', { 'active': this.curLoc(`/edit_profile`) })}>
                            <Link to="/edit_profile"><i className="fa fa-edit"></i> Edit Profile</Link>
                        </li>
                        <li className={cx('', { 'active': this.curLoc(`/add_edu`) })}>
                            <Link to="/add_edu"><i className="fa fa-mortar-board"></i> Add Education</Link>
                        </li>
                        <li className={cx('', { 'active': this.curLoc(`/add_exp`) })}>
                            <Link to="/add_exp"><i className="fa fa-id-card-o"></i> Add Experience</Link>
                        </li>
                        <li className={cx('', { 'active': this.curLoc(`/user/${user.id}`) })}>
                            <Link to={`/profile/${selectedProfile.handel}`}><i className="fa fa-user"></i> Profile View</Link>
                        </li>
                        <li className={cx('', { 'active': this.curLoc(`/user/${user.id}`) })}>
                            <Link to={`/posts`}><i className="fa fa-envelope"></i> Feed</Link>
                        </li>
                    </ul>
                </div>
                <div className="clearfix" />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state)
{
    return{
        auth : state.auth
    }
}

export default connect(mapStateToProps)(withRouter(DashboardLinks));
