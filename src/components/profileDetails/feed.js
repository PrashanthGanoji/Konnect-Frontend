import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost, getFeed, likePost, getCurrentProfile } from '../../actions/profile_actions'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Spinner from '../common/spinner'
import profileImg from '../../img/blank-profiles/blankProfile.png'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import isEmpty from '../../utils/is_empty'
import { clearErrors } from '../../actions/auth_actions';

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            img: null,
            tags: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile()
        this.props.getFeed()
    }

    fileChangedHandler = (event) => {
        this.setState({ img: event.target.files[0] })
    }

    addlike = (e, ele) => {
        e.preventDefault()
        if(!this.props.auth.isAuthenticated)
            this.props.history.push('/login')

        this.props.currentProfile.selectedProfile &&
            !ele.likes.includes(this.props.currentProfile.selectedProfile.id) ? this.props.likePost(ele.id) : ''
    }

    isLiked = (ele) =>{
        return this.props.currentProfile.selectedProfile &&
        !ele.likes.includes(this.props.currentProfile.selectedProfile.id)?false : true
    }

    postData = () => {

        if(!this.props.auth.isAuthenticated)
            this.props.history.push('/login')

        const formData = new FormData()
        console.log(this.state)
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        if (this.state.img !== null) {
            formData.append('img', this.state.img, this.state.img.name)
            formData.append('hasimg', true)
        }

        if (this.state.tags !== '') {
            const tags = this.state.tags.split(',').map(element => {
                element = element.trim()
                element = element.toLowerCase()
                return element
            })
            for (var i = 0; i < tags.length; i++) {
                formData.append('tags', tags[i]);
            }
        }
        this.props.createPost(formData)
    }

    componentWillReceiveProps(nextProp) {
        if (!isEmpty(nextProp.errors)) {
            this.setState({ errors: nextProp.errors })
        }
        else{
            const resetstate = {
                title: '',
                description: '',
                img: null,
                tags: '',
                errors: {}
            }
            this.setState({...resetstate})
        }
    }
    
    render() {
        const { errors } = this.state

        TimeAgo.locale(en)
        const timeAgo = new TimeAgo('en-US')

        let posts
        if (this.props.posts.postsList == null || this.props.posts.loading == true)
            posts = <Spinner />
        else if (this.props.posts.postsList.length == 0)
            posts = <div>No posts</div>
        else
            posts = this.props.posts.postsList.map((ele) => (
                <div key={ele.id} className="col-sm-12 col-xs-12 pb--30" >
                    <div className="post--item post--info">
                        < ul className="comment--items nav" >
                            <li>
                                <div className="comment--item mr--15 clearfix">
                                    <div className="img float--left" data-overlay-color="primary">
                                        <img src={ele.profile.avatar ? ele.profile.avatar : profileImg} alt="" />
                                    </div>
                                    <div>
                                        <div className="header clearfix">
                                            <div className="meta float--left">
                                                <p className="fs--14 fw--700 text-darkest">
                                                    <Link to={`/profile/${ele.profile.handel}`}>{ele.profile.fullname}</Link>
                                                </p>
                                                <p>
                                                    <a>
                                                        <i className="mr--8 fa fa-calendar-o"></i>
                                                        <span>{timeAgo.format(new Date() - (new Date() - new Date(ele.date)))}</span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <hr style={{ marginTop: '5px', marginBottom: '10px' }} />
                        {ele.img ? <div className="post--img">
                            <Link to={`/post/${ele.id}`} ><img src={ele.img} alt="" /></Link>
                        </div> : ''}
                        <div>
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
                                    <li className = {classnames({'likestyle':this.isLiked(ele)})}>
                                        <a  onClick={(e) => { this.addlike(e, ele) }}>
                                            <i style={{ fontSize: '14px', cursor: 'Pointer' }} className="mr--8 fa fa-thumbs-up"></i>
                                            <span> Likes {ele.likes.length}</span>
                                        </a>
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

            <div class="container">
                <div class="comment--form pb--30" data-form="validate">
                    <h4 class="h4 pb--15">Create Post</h4>
                    <p>required fields are marked *</p>
                    <form>
                        <div class="row gutter--15">
                            <div class="col-sm-12 col-xxs-12">
                                <div class="form-group">
                                    <input type="text"
                                        onChange={(e) => { this.setState({ title: e.target.value }) }} value={this.state.title} name="title" placeholder="Title *" className={classnames("form-control", { 'error': errors.title })} required="" />
                                    {errors.title && (<p className="error-msg">{errors.title[0]}</p>)}
                                </div>
                            </div>

                            <div class="col-sm-12 col-xxs-12">
                                <div class="form-group">
                                    <label>
                                        Enter Tags as comma seperated values
                                    <input type="text" name="tags"
                                            value={this.state.tags}
                                            onChange={(e) => { this.setState({ tags: e.target.value }) }} placeholder="Tags" class="form-control" required="" />
                                    </label>
                                </div>
                            </div>

                            <div class="col-sm-4 col-xxs-12">
                                <div class="form-group">
                                    <label>
                                        Choose an image(optional)
                                    <input style={{
                                            background: 'lightblue',
                                            borderRadius: '.5em',
                                            padding: '.5em'
                                        }} type="file" onChange={(e) => { this.fileChangedHandler(e) }} name="img" />
                                    </label>
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <textarea name="comment" placeholder="Post Description *"
                                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                                        className={classnames("form-control", { 'error': errors.description })} required="" value={this.state.description}></textarea>
                                    {errors.description && (<p className="error-msg">{errors.description[0]}</p>)}
                                </div>
                            </div>

                            <div class="col-sm-12 pt--10">
                                <button onClick={(e) => { e.preventDefault(); this.postData() }} type="submit" class="btn btn-sm btn-primary fs--14"> Create Post</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    {posts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    auth: state.auth,
    errors: state.errors,
    currentProfile: state.currentProfile
})

const mapDispatchToProps = {
    createPost: createPost,
    getFeed: getFeed,
    clearErrors: clearErrors,
    getCurrentProfile: getCurrentProfile,
    likePost: likePost
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Feed))
