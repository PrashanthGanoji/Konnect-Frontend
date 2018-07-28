import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ProfileInfo extends Component {
    render() {
        const { profile } = this.props
        delete profile.id
        const profileData = Object.keys(profile).map((item, i) =>
            (
                typeof profile[item] !== 'object' &&
                <tr key={i}>
                    <td className='ff--primary fs--18 text-black bg-lighter'>{item}</td>
                    {(item === 'avatar') ? <td><img src={profile[item]} /></td> : <td>{profile[item]}
                    </td>}
                </tr>
            ))
        return (
            <div className="mt--50">

                <table className="table">
                    <caption>Basic Info</caption>

                    <tbody className="fs--14 text-darkest">
                        {profileData}
                    </tbody>
                </table>
                <Link to="/edit_profile" className="btn btn-default btn-sm"><i className="fa fa-pencil"></i> Edit</Link>
            </div>
        )
    }
}

export default connect(null)(ProfileInfo);