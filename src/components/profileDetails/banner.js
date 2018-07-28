import React, { Component } from 'react'
import avatar from '../../img/blank-profiles/blankProfile.png'
import cover from '../../img/coverprofile.jpg'
import profileImg from '../../img/blank-profiles/blankProfile.png'

class Banner extends Component {
    constructor(props)
    {
        super(props)
    }

  render() 
  {
    console.log('profile is',this.props.profile.profileshown)
    const profile = this.props.profile.profileshown
    return (
      <div>
        <div className="cover--header pt--80 text-center bg--img" data-overlay="0.6" data-overlay-color="white" data-rjs="2" style={{backgroundImage: `url(${cover})`}}data-rjs-processed="true">
            <div className="container">
                <div className="cover--avatar online" data-overlay="0.3" data-overlay-color="primary">
                    <img src={profile.avatar?profile.avatar:profileImg} alt=""/>
                </div>

                <div className="cover--user-name">
                    <h2 className="h3 fw--600">{profile.fullname.toUpperCase()}</h2>
                </div>

                <div className="cover--user-activity">
                    <p><i className="fa mr--8 fa-map-marker"></i>{profile.location}</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Banner