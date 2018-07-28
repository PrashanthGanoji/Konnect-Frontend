import React, { Component } from 'react'
import isEmpty from '../../utils/is_empty'
import { Link, withRouter } from 'react-router-dom'
import blankProfile from '../../img/blank-profiles/blankProfile.png'
import { connect } from 'react-redux'
import { addFriend } from '../../actions/profile_actions'

class ProfileItem extends Component {

    render() {
        const { profile, selectedProfile, auth } = this.props

        let conButton;
        console.log(this.props)
        if (auth.isAuthenticated && auth.user.id == profile.user.id)
            conButton = ''
        else {
            if (selectedProfile && selectedProfile.friends && selectedProfile.friends.includes(profile.id)) {
                conButton = <button style={{ pointerEvents: 'none' }} className="btn btn-sm btn-default">
                    <i style={{ color: '#66ff66' }} className="fa fa-check"></i> Connected</button>
            }
            else if (selectedProfile == null) {
                conButton = <button className="btn btn-sm btn-primary"
                    onClick={(e) => { e.preventDefault(); this.props.history.push('/login') }}
                ><i className="fa fa-user-plus"></i> Connect</button>
            }
            else {
                conButton = <button className="btn btn-sm btn-primary"
                    onClick={(e) => { e.preventDefault(); this.props.addFriend(profile.id) }}
                ><i className="fa fa-user-plus"></i> Connect</button>
            }
        }


        return (
            <div>
                <div className="member--item card-list">
                    <div className="cover--avatar" style={{ minWidth: '100px', height: 'auto' }}>
                        <Link to={`profile/${profile.handel}`} className="btn-link">
                            <img src={isEmpty(profile.avatar) ? blankProfile : profile.avatar} alt="" />
                        </Link>
                    </div>
                    <div className='card-info' >
                        <div>
                            <h3 className="h5 fs--18 text-left">
                                {profile.fullname}
                            </h3>
                            <div className="activity text-left">
                                <p>{profile.location}</p>
                            </div>
                            <div className="activity text-left">
                                <p className='h6'>{profile.status}</p>
                            </div>
                        </div>
                        <div className="skills-list">
                            <ul className='nav'>
                                {profile.skills.map((skill, index) => (
                                    isEmpty(skill) ? null : <li key={index}><i className="fa fa-check"></i> {skill[0].toUpperCase() + skill.slice(1)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='card-info-buttons'>
                        {conButton}
                        <Link to={`profile/${profile.handel}`} className="btn btn-sm btn-default"><i className="fa fa-external-link"></i> Details</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { addFriend: addFriend })(withRouter(ProfileItem))

