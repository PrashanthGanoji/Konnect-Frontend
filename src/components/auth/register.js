import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../../actions/auth_actions'

class SignUpForm extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    postData = () => {
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.password2
        }

        this.props.registerUser(data, this.props.history);
    };

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProp)
    {
        if(nextProp.errors)
        {
            this.setState({errors: nextProp.errors})
        }
    }

    render() {

        const { errors } = this.state
        const { auth } = this.props
        return (
            <div className="mt--50" style={{margin: ' 0 auto',maxWidth: '768px'}}>
                <div className="contact--form" style={{margin: ' 0 auto'}}>
                    <div className="contact--title">
                        <h3 className="h3">Sign Up</h3>
                    </div>

                    <div className="contact--subtitle pt--15">
                        <h4 className="h6 fw--400 text-darkest">sign up now and get konnected with people.</h4>
                    </div>

                    <div className="contact--notes ff--primary mt--2">
                        <p>(Required field are marked *)</p>
                    </div>

                    <form autoComplete="off">
                        <div className="row gutter--20">
                            <div className="col-xs-12 col-xxs-12">
                                <div className="form-group">
                                    <input type="email" name="email"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        value={this.state.email} placeholder="Email *"
                                        className={classnames("form-control", { 'error': errors.email })}
                                        required="true"/>
                                    {errors.email && (<p className="error-msg">{errors.email[0]}</p>)}
                                </div>
                            </div>
                            <div className="col-xs-12 col-xxs-12">
                                <div className="form-group">
                                    <input type="text" name="name"
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        value={this.state.username} placeholder="Name *"
                                        className={classnames("form-control", { 'error': errors.username })}
                                        required="true" />
                                    {errors.username && (<p className="error-msg">{errors.username[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-6 col-xxs-12">
                                <div className="form-group">
                                    <input type="password" name="password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        value={this.state.password} placeholder="Password *"
                                        className={classnames("form-control", { 'error': errors.password || errors.non_field_errors })}
                                        required="true" aria-invalid="true" />
                                    {errors.password && (<p className="error-msg">{errors.password[0]}</p>)}
                                    {errors.non_field_errors && (<p className="error-msg">{errors.non_field_errors[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-6 col-xxs-12">
                                <div className="form-group">
                                    <input type="password" name="password2"
                                        onChange={(e) => this.setState({ password2: e.target.value })}
                                        value={this.state.password2}
                                        placeholder="Confirm Password *"
                                        className={classnames("form-control", { 'error': errors.confirm_password || errors.non_field_errors })}
                                        required="true" aria-invalid="true" />
                                    {errors.confirm_password && (<p className="error-msg">{errors.confirm_password[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <button type="submit"
                                    onClick={(e) => { e.preventDefault(); this.postData() }}
                                    className="btn btn-primary mt--10">Sign Up</button>
                            </div>
                        </div>
                        <div className="status"></div>
                    </form>
                </div>
            </div>
        )
    }
}

//This is a good practice to let the component know what props are being passed to it
SignUpForm.propTypes = {
    registerUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}   

function mapStateToProps(state){
    return {
        auth : state.auth,
        errors : state.errors
    }
}

function mapDispatchToProps(dispatch){
    //Whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({registerUser: registerUser}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm))