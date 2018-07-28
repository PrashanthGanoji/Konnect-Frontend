import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFriends, unFriend } from '../../actions/profile_actions'
import Spinner from '../common/spinner';
import profileImg from '../../img/blank-profiles/blankProfile.png'


class FriendList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            load: false
        }
    }

    componentDidMount() {
        const { id } = this.props.profileShown.profileshown
        this.props.getFriends(id)
    }

    componentDidUpdate(prevProps) {

        if (this.state.load == true) {
            const { id } = this.props.profileShown.profileshown
            this.props.getFriends(id)
            this.setState({ load: false })
        }

    }

    render() {
        console.log(this.props.friends)
        if (this.props.friends === null)
            return <Spinner />
        else if (this.props.friends.length == 0)
            return <div>No friends </div>

        let showUnfriend = false
        if (this.props.auth.isAuthenticated) {
            console.log(this.props.profileShown.profileshown.user.id, this.props.auth.user.user_id)
            if (this.props.profileShown.profileshown.user.id === this.props.auth.user.user_id) {
                showUnfriend = true
            }
        }
        console.log(this.props, showUnfriend)
        const friendList = this.props.friends.map(ele => {
            return <div key={ele.id} className="col-md-3 col-xs-6 col-xxs-12">
                <div className="member--item online">
                    <div className="img img-circle">
                        <a className="btn-link">
                            <img src={ele.avatar?ele.avatar:profileImg} alt="" />
                        </a>
                    </div>

                    <div className="name">
                        <h3 className="h6 fs--12">
                            <a className="btn-link">{ele.fullname}</a>
                        </h3>
                    </div>

                    <div className="activity">
                        <p><i className="fa mr--8 fa-map-marker"></i>{ele.location}</p>
                    </div>
                    {showUnfriend ? <div >
                        <button
                            onClick={() => { this.props.unFriend(ele.id); this.setState({ load: true }) }} style={{ padding: '5px', lineHeight: '14px' }} className='btn btn-sm'><i className="fa mr--8 fa-trash" style={{ color: 'red' }}></i>Unfriend</button>
                    </div> : ''}

                </div>
            </div>
        })
        console.log(friendList)
        return (
            <div className='member--items'>
                <div className="row gutter--15">
                    {friendList}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getFriends: getFriends,
    unFriend: unFriend
}

const mapStateToProps = (state) => ({
    friends: state.profileShown.friends,
    auth: state.auth,
    profileShown: state.profileShown
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendList)
