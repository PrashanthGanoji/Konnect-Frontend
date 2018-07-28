import React, { Component } from 'react';
import classnames from 'classnames'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { loginUser } from '../../actions/auth_actions'
// import axios from 'axios';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors :{}
        };
    }

    postData = ()=>{
        const data = {
            username_or_email : this.state.email,
            password: this.state.password
        }  
        this.props.loginUser(data)
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    
    componentWillReceiveProps(nextProp)
    {
        if(nextProp.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        if(nextProp.errors)
        {
            this.setState({errors: nextProp.errors})
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="mt--50" style={{margin: ' 0 auto',maxWidth: '768px'}}>
            <div className="contact--form" style={{margin: ' 0 auto'}}>
                <div className="contact--title">
                    <h3 className="h3">Welcome Back!</h3>
                </div>

                <div className="contact--notes ff--primary mt--2">
                    <p>(Required field are marked *)</p>
                </div>

                <form autoComplete="off">
                    <div className="row gutter--20">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <input type="email"
                                value = {this.state.email}
                                onChange = {(e)=>{this.setState({email:e.target.value})}}
                                 name="subject" placeholder="Username or Email *" 
                                 className={classnames("form-control", {'error':errors.username_or_email})}
                                 required="" aria-invalid="false" />
                                 {errors.username_or_email && (<p className='error-msg'>{errors.username_or_email}</p>)}
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="form-group">
                                <input type="password"
                                onChange = {(e)=>{this.setState({password:e.target.value})}}
                                value = {this.state.password} name="email" placeholder="Password *" 
                                className={classnames("form-control", {'error': errors.non_field_errors, 'error': errors.password})}
                                required="" aria-invalid="true" />
                                {errors.non_field_errors && (<p className='error-msg'>{errors.non_field_errors}</p>)}
                                {errors.password && (<p className='error-msg'>{errors.password}</p>)}
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <button onClick = {(e)=>{e.preventDefault();this.postData()}} className="btn btn-primary mt--10">Login</button>
                        </div>
                    </div>

                    <div className="status"></div>
                </form>
            </div>
            </div>
        )
    }
}

LoginForm.propTypes = {
    loginUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}   

function mapStateToProps(state){
    return {
        auth : state.auth,
        errors : state.errors
    }
}

function mapDispatchToProps(dispatch){
    //Whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({loginUser: loginUser}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))