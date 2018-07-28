import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getPostDetails } from '../../actions/profile_actions'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Spinner from '../common/spinner'
import profileImg from '../../img/blank-profiles/blankProfile.png'
import isEmpty from '../../utils/is_empty'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { clearErrors } from '../../actions/auth_actions';

class postDetails extends Component {

    componentDidMount() {
        this.props.getPostDetails(this.props.match.params.id)
        window.scrollTo(0, 0)
    }

    constructor(profile) {
        super(profile)

        this.state = {
            description: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProp) {
        if (!isEmpty(nextProp.errors)) {
            this.setState({ errors: nextProp.errors })
        }
        else {
            const resetstate = {
                description: '',
                errors: {}
            }
            this.setState({...resetstate})
        }
    }

    componentWillUnmount(){
        this.props.clearErrors()
    }

    postData = () => {
        if (!this.props.auth.isAuthenticated)
            this.props.history.push('/login')

        const formData = new FormData()
        formData.append('description', this.state.description)
        this.props.addComment(this.props.posts.postDetail.id, formData)
    }

    render() {
        if (this.props.posts.postDetail == null || this.props.posts.loading == true)
            return <Spinner />
        const { postDetail } = this.props.posts

        TimeAgo.locale(en)
        const timeAgo = new TimeAgo('en-US')

        const comments = postDetail.comments_set.map(ele => {
            return <div key={ele.id} class="comment--item mr--15 clearfix">
                <div class="img float--left" data-overlay="0.3" data-overlay-color="primary">
                    <img src={ele.user.avatar ? ele.user.avatar : profileImg} alt="" />
                </div>

                <div class="info ov--h">
                    <div class="header clearfix">
                        <div class="meta float--left">
                            <p class="fs--14 fw--700 text-darkest">
                                <Link to={`/profile/${ele.handel}`}>{ele.user.fullname}</Link>
                            </p>
                            <p>
                                <i class="mr--10 fa fa-clock-o"></i>
                                <span>{timeAgo.format(Date.now() - (new Date() - new Date(ele.date)))}</span>
                            </p>
                        </div>
                    </div>

                    <div class="content pt--8 fs--14">
                        <p>{ele.description}</p>
                    </div>
                </div>
            </div>
        })
        return (
            <div className='container'>
                <div className="post--item post--info mt--30">
                    < ul className="comment--items nav" >
                        <li>
                            <div class="comment--item mr--15 clearfix">
                                <div class="img float--left" data-overlay-color="primary">
                                    <img src={postDetail.profile.avatar ? postDetail.profile.avatar : profileImg} alt="" />
                                </div>
                                <div>
                                    <div class="header clearfix">
                                        <div class="meta float--left">
                                            <p class="fs--14 fw--700 text-darkest">
                                                <a href="#">{postDetail.profile.fullname}</a>
                                            </p>
                                            <p>
                                                <a>
                                                    <i className="mr--8 fa fa-calendar-o"></i>
                                                    <span>{timeAgo.format(Date.now() - (new Date() - new Date(postDetail.date)))}</span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <hr style={{ marginTop: '5px', marginBottom: '10px' }} />
                    {postDetail.img ? <div className="post--img">
                        <a href=""><img src={postDetail.img} alt="" /></a>
                    </div> : ''}
                    <div>
                        <div className="post--title mt--10">
                            <h3 className="h6">
                                <Link to={`/post/${postDetail.id}`} className="btn-link">{postDetail.title}</Link>
                            </h3>
                        </div>
                        <div className="post--meta">
                            <ul className="nav">
                                <li>
                                    <i className="mr--8 fa fa-tags"></i>
                                    {postDetail.tags.length > 0 ? postDetail.tags.map(t => <a key={t}><span>{t}</span></a>) : <a><span>General</span></a>}
                                </li>
                                <li>
                                    <a>
                                        <i style={{ fontSize: '14px', cursor: 'Pointer' }} className="mr--8 fa fa-thumbs-up"></i>
                                        <span> Likes {postDetail.likes.length}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="post--content text-darker mt--10">
                            <p>{postDetail.description}</p>
                        </div>
                    </div>
                </div>
                <div class="comment--list pt--40">
                    <h4 class="h4 pb--20">{postDetail.comments_set.length} Comments</h4>

                    <ul class="comment--items nav">
                        <li>
                            {comments}
                        </li>
                    </ul>
                </div>

                <div class="comment--form pb--30" data-form="validate">
                    <h4 class="h4 pb--15">Leave A Comment</h4>
                    <form>
                        <div class="row gutter--15">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <textarea name="description" placeholder="Comment *"
                                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                                        className={classnames("form-control", { 'error': this.state.errors.description })} value = {this.state.description}></textarea>
                                    {this.state.errors.description && (<p className="error-msg">{this.state.errors.description[0]}</p>)}
                                </div>
                            </div>

                            <div class="col-sm-12 pt--10">
                                <button onClick={(e) => { e.preventDefault(); this.postData() }} type="submit" class="btn btn-sm btn-primary fs--14"> Comment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    posts: state.posts
    
})

const mapDispatchToProps = {
    getPostDetails: getPostDetails,
    addComment: addComment,
    clearErrors:clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(postDetails)
