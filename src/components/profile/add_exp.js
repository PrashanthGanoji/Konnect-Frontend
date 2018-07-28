import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter, Link } from 'react-router-dom'
import { addExp } from '../../actions/profile_actions'
import {clearErrors} from '../../actions/auth_actions'
import isEmpty from '../../utils/is_empty'

class ExpForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            company: '',
            location: '',
            start: '',
            end: '',
            current: false,
            description: '',
            errors: {},
        }
    }

    postData = () => {
        console.log(this.state)
        let expData = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            start: this.state.start,
            current: this.state.current,
            end: isEmpty(this.state.end) ? null : this.state.end,
            description: this.state.description,
        }
        this.props.addExp(expData, this.props.history)
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.errors) {
            this.setState({ errors: nextProp.errors })
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
                <div className="contact--form" style={{margin: '0 auto'}}>
                    <div className="contact--title">
                        <h3 className="h3">Add Experience</h3>
                    </div>

                    <div className="contact--subtitle pt--15">
                        <h4 className="h6 fw--400 text-darkest">you can add your work experiences here..</h4>
                    </div>

                    <div className="contact--notes ff--primary mt--2">
                        <p>(Required field are marked *)</p>
                    </div>

                    <form autoComplete="off">
                        <div className="row gutter--20">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="title"
                                        onChange={(e) => this.setState({ title: e.target.value })}
                                        value={this.state.title} placeholder="Position/Role *"
                                        className={classnames("form-control", { 'error': errors.title })}
                                        required="true" aria-invalid="false" />
                                    {errors.title && (<p className="error-msg">{errors.title[0]}</p>)}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="company"
                                        onChange={(e) => this.setState({ company: e.target.value })}
                                        value={this.state.company} placeholder="Company/Institute name *"
                                        className={classnames("form-control", { 'error': errors.company })}
                                        required="true" aria-invalid="false" />
                                    {errors.company && (<p className="error-msg">{errors.company[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="location"
                                        onChange={(e) => this.setState({ location: e.target.value })}
                                        value={this.state.location} placeholder="Location/Place of company *"
                                        className={classnames("form-control", { 'error': errors.location })}
                                        required="true" aria-invalid="true" />
                                    {errors.location && (<p className="error-msg">{errors.location[0]}</p>)}
                                </div>

                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                <label>
                                    Start Date
                                    <input type="date" name="start"
                                        onChange={(e) => this.setState({ start: e.target.value })}
                                        value={this.state.start}
                                        placeholder="joining date "
                                        className={classnames("form-control", { 'error': errors.start })}
                                        required="true" aria-invalid="true" />
                                    {errors.start && (<p className="error-msg">{errors.start[0]}</p>)}
                                    </label>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="current"
                                            onChange={(e) => this.setState({ current: !this.state.current })}
                                            checked={this.state.current} placeholder="current"
                                            className={classnames({'error': errors.current })}
                                            aria-invalid="true" />
                                        {errors.current && (<p className="error-msg">{errors.current[0]}</p>)}
                                        <span>Current Job</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                <label>
                                    End Date
                                    <input type="date" name="end"
                                        onChange={(e) => this.setState({ end: e.target.value })}
                                        value={this.state.end}
                                        placeholder="leaving date "
                                        disabled={this.state.current ? true : false}
                                        className={classnames("form-control", { 'error': errors.end })}
                                        aria-invalid="true" />
                                    {errors.end && (<p className="error-msg">{errors.end[0]}</p>)}
                                    </label>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea name="description"
                                        onChange={(e) => this.setState({ description: e.target.value })}
                                        placeholder="Description *" className="form-control" required="" value={this.state.description}></textarea>
                                    {errors.description && (<p className="error-msg">{errors.description[0]}</p>)}
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

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { addExp, clearErrors })(withRouter(ExpForm))