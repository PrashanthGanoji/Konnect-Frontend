import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import { editProfile, getCurrentProfile } from '../../actions/profile_actions'
import { clearErrors } from '../../actions/auth_actions'
import { bindActionCreators } from 'redux'
import isEmpty from '../../utils/is_empty'

class EditProfileForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            avatar: null,
            website: '',
            location: '',
            status: 'student',
            skills: '',
            bio: '',
            gitusername: '',
            linkedIn: '',
            errors: {}
        }
        this.props.getCurrentProfile()
    }

    postData = () => {
        const formData = new FormData()
        console.log(this.state)
        formData.append('handel', this.props.auth.user.username)
        formData.append('fullname', this.state.fullname)
        if (this.state.avatar !== null)
            formData.append('avatar', this.state.avatar, this.state.avatar.name)
        if (this.state.website !== '' && this.state.website !== null)
            formData.append('website', this.state.website)
        formData.append('location', this.state.location)
        formData.append('status', this.state.status)
        const skills = this.state.skills.split(',').map(element => {
            element = element.trim()
            element = element.toLowerCase()
            return element
        })
        for (var i = 0; i < skills.length; i++) {
            formData.append('skills', skills[i]);
        }
        formData.append('bio', this.state.bio)
        formData.append('linkedIn', this.state.linkedIn)
        formData.append('gitusername', this.state.gitusername)

        this.props.editProfile(formData, this.props.history)
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const profile = nextProps.currentProfile.selectedProfile
    //     if (nextProps.currentProfile.selectedProfile !== prevState.currentProfile) {
    //        return{
    //         ...profile,
    //         skills: !isEmpty(profile.skills) ? profile.skills.join(', ') : '',
    //         avatar: !isEmpty(profile.avatar) ? profile.avatar : ''
    //        }
    //     }
    //     else if(nextProps.errors)
    //     {
    //         return{
    //             errors: nextProps.errors,
    //         }
    //     }
    //     else
    //         return null;
    // }

    fileChangedHandler = (event) => {
        this.setState({ avatar: event.target.files[0] })
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.errors) {
            this.setState({ errors: nextProp.errors })
        }
        if (nextProp.currentProfile.selectedProfile) {
            const profile = nextProp.currentProfile.selectedProfile

            this.setState({ ...profile, skills: !isEmpty(profile.skills) ? profile.skills.join(', ') : '', avatar: null })
            console.log(this.state)
        }
    }

    componentWillUnmount(){
        this.props.clearErrors()
    }

    render() {
        const { errors } = this.state
        return (
            <div className="mt--50" style={{margin: ' 0 auto',maxWidth: '768px'}}>
            <Link to='/dashboard' className='btn btn-default btn-sm mt--20 mb--20'>Back</Link>
                <div className="contact--form" style={{margin:'0 auto'}}>
                    <div className="contact--title">
                        <h3 className="h3">Edit Profile</h3>
                    </div>
                    <div className="contact--notes ff--primary mt--2">
                        <p>(Required field are marked *)</p>
                    </div>

                    <form autoComplete="off">
                        <div className="row gutter--20">
                            {/* <div className="col-xs-12">
                                <div className="form-group">
                                    <label for="handel">
                                       handle is used in the url of your profile page
                                    </label>
                                    <input type="text" id='handel' name="handel"
                                        onChange={(e) => this.setState({ handel: e.target.value })}
                                        value={this.state.handel} placeholder="Unique Handle *"
                                        className={classnames("form-control", { 'error': errors.handel })}
                                        required="true" aria-invalid="false" />
                                    {errors.handel && (<p className="error-msg">{errors.handel[0]}</p>)}
                                </div>
                            </div> */}
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="fullname"
                                        onChange={(e) => this.setState({ fullname: e.target.value })}
                                        value={this.state.fullname} placeholder="Your full name *"
                                        className={classnames("form-control", { 'error': errors.fullname })}
                                        required="true" aria-invalid="false" />
                                    {errors.fullname && (<p className="error-msg">{errors.fullname[0]}</p>)}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label for='avatar'>Profile Picture
                                    </label>
                                    <input style={{
                                            background: 'lightblue',
                                            borderRadius: '.5em',
                                            padding: '.5em'
                                        }} type="file" id='avatar' name="avatar"
                                        onChange={(e) => this.fileChangedHandler(e)}
                                        className={classnames({ 'error': errors.avatar })}
                                        required="true" aria-invalid="false" />
                                    {errors.avatar && (<p className="error-msg">{errors.avatar[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="website"
                                        onChange={(e) => this.setState({ website: e.target.value })}
                                        value={this.state.website} placeholder="Your Website/Blog URL"
                                        className={classnames("form-control", { 'error': errors.website })}
                                        required="true" aria-invalid="true" />
                                    {errors.website && (<p className="error-msg">{errors.website[0]}</p>)}
                                </div>

                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="location"
                                        onChange={(e) => this.setState({ location: e.target.value })}
                                        value={this.state.location}
                                        placeholder="Place/Location *"
                                        className={classnames("form-control", { 'error': errors.location })}
                                        required="true" aria-invalid="true" />
                                    {errors.location && (<p className="error-msg">{errors.location[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                <label for="status">Status</label>
                                    <select name="status" id="status" value={this.state.status} onChange={(e) => { this.setState({ status: e.target.value }) }} className="form-control form-sm">
                                        <option value="student">Student</option>
                                        <option value="professional">Professional</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="looking for job">Looking For Job</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                <label>
                                    Enter your skills as csv values eg: (HTML, Python, Java)
                                    <input type="text" name="skills"
                                        onChange={(e) => this.setState({ skills: e.target.value })}
                                        value={this.state.skills}
                                        placeholder="technologies known (as comma seperated values) *"
                                        className={classnames("form-control", { 'error': errors.skills })}
                                        required="true" aria-invalid="true" />
                                    {errors.skills && (<p className="error-msg">{errors.skills[0]}</p>)}
                                    </label>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="gitusername"
                                        onChange={(e) => this.setState({ gitusername: e.target.value })}
                                        value={this.state.gitusername}
                                        placeholder="Github account username *"
                                        className={classnames("form-control", { 'error': errors.gitusername })}
                                        required="true" aria-invalid="true" />
                                    {errors.gitusername && (<p className="error-msg">{errors.gitusername[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                <label>
                                    optional
                                    <input type="text" name="linkedIn"
                                        onChange={(e) => this.setState({ linkedIn: e.target.value })}
                                        value={this.state.linkedIn}
                                        placeholder="LinkedIn profile URL"
                                        className={classnames("form-control", { 'error': errors.linkedIn })}
                                        required="true" aria-invalid="true" />
                                    {errors.linkedIn && (<p className="error-msg">{errors.linkedIn[0]}</p>)}</label>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea name="bio"
                                        onChange={(e) => this.setState({ bio: e.target.value })}
                                        placeholder="your short Bio *" className="form-control" required="" value={this.state.bio}></textarea>
                                    {errors.bio && (<p className="error-msg">{errors.bio[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <button type="submit"
                                    onClick={(e) => { e.preventDefault(); this.postData() }}
                                    className="btn btn-primary mt--10">Save</button>
                            </div>
                        </div>
                        <div className="status"></div>
                    </form>
                </div>
            </div>
        )
    }
}

EditProfileForm.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    currentProfile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        currentProfile: state.currentProfile,
        auth: state.auth,
        errors: state.errors,
    }
}

function mapDispatchToProps(dispatch) {
    //Whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({ editProfile: editProfile, getCurrentProfile: getCurrentProfile, clearErrors:clearErrors }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfileForm)) 