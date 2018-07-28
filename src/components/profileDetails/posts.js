import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../../actions/profile_actions'
import { Link } from 'react-router-dom'
import Spinner from '../common/spinner'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export class Posts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            load: false
        }
    }

    componentDidMount() {
        const { handel } = this.props.profileShown.profileshown
        this.props.getPosts(handel)
    }

    render() {

        TimeAgo.locale(en)
        const timeAgo = new TimeAgo('en-US')


        if (this.props.posts.postsList == null || this.props.posts.loading == true)
            return <Spinner />
        else if (this.props.posts.postsList.length == 0)
            return <div>No posts</div>

        let showDelete = false
        if (this.props.auth.isAuthenticated) {
            if (this.props.profileShown.profileshown.user.id === this.props.auth.user.user_id) {
                showDelete = true
            }
        }
        const { handel } = this.props.profileShown.profileshown

        const posts = this.props.posts.postsList.map(ele => (
            <div key={ele.id} className="col-sm-12 col-xs-12 pb--30" >
                <div className="post--item">
                    {ele.img ? <div className="post--img">
                    <Link to={`/post/${ele.id}`}><img src={ele.img} alt="" /></Link>
                    </div> : ''}
                    <div className="post--info">
                        <div className="post--meta">
                            <ul className="nav">
                                <li>
                                    <a>
                                        <i className="mr--8 fa fa-calendar-o"></i>
                                        <span>{timeAgo.format(new Date() - (new Date() - new Date(ele.date)))}</span>
                                    </a>
                                </li>
                                <li>
                                    <a >
                                        <i className="mr--8 fa fa-thumbs-up"></i>
                                        <span>{ele.likes.length}</span>
                                    </a>
                                </li>
                                {showDelete ? <li style={{ float: 'right' }}>
                                    <a onClick={(e) => { this.props.deletePost(ele.id, handel) }} style={{ cursor: 'pointer' }}>
                                        <i style={{ color: 'red' }} className="mr--8 fa fa-trash"></i>
                                        <span> Delete Post</span>
                                    </a>
                                </li> : ''}

                            </ul>
                        </div>
                        <div className="post--title mt--10">
                            <h3 className="h6">
                                <Link to={`/post/${ele.id}`} className="btn-link">{ele.title}</Link>
                            </h3>
                        </div>
                        <div className="post--meta">
                            <ul className="nav">
                                <li>
                                    <i className="mr--8 fa fa-tags"></i>
                                    {ele.tags.length > 0 ? ele.tags.map(t => <a key={t}><span>{t}</span></a>) : <a><span>General</span></a>}
                                </li>
                            </ul>
                        </div>
                        <div className="post--content text-darker mt--10">
                            <p>{ele.description}</p>
                        </div>
                        <div className="post--action text-darkest mt--8">
                            <Link to={`/post/${ele.id}`} className="btn-link">view comments<i className="ml--10 text-primary fa fa-caret-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        ))
        return (
            <React.Fragment>
                {posts}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    getPosts: getPosts,
    deletePost: deletePost
}

const mapStateToProps = (state) => ({
    profileShown: state.profileShown,
    auth: state.auth,
    posts: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)



/*
                <div class="page--count">
                    <label class="ff--primary fs--14 fw--500 text-darker">
                        <span>Viewing</span>

                        <a href="#" class="btn-link"><i class="fa fa-caret-left"></i></a>
                        <input type="number" name="page-count" value="01" class="form-control form-sm" />
                        <a href="#" class="btn-link"><i class="fa fa-caret-right"></i></a>

                        <span>of 68</span>
                    </label>
                </div>
            </div>
        </React.Fragment>
    )
}*/