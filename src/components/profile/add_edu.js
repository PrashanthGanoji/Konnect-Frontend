import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter, Link } from 'react-router-dom'
import { addEdu } from '../../actions/profile_actions'
import {clearErrors} from '../../actions/auth_actions'
import isEmpty from '../../utils/is_empty'

class EduForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            degree:'',
            school: '',
            location: '',
            fieldOfStudy: '',
            start: '',
            end: '',
            description: '',
            errors: {},
        }
    }

    postData = () => {
        console.log(this.state)
        let eduData = {
            degree : this.state.degree,
            school : this.state.school,
            location : this.state.location,
            fieldOfStudy : this.state.fieldOfStudy,
            start : this.state.start,
            end : isEmpty(this.state.end)?null:this.state.end,
            description : this.state.description,
        }
        this.props.addEdu(eduData, this.props.history)
    }

    componentWillReceiveProps(nextProp)
    {
        if(nextProp.errors)
        {
            this.setState({errors: nextProp.errors})
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
                        <h3 className="h3">Add Education</h3>
                    </div>

                    <div className="contact--subtitle pt--15">
                        <h4 className="h6 fw--400 text-darkest">you can add the schools you have attended here..</h4>
                    </div>

                    <div className="contact--notes ff--primary mt--2">
                        <p>(Required field are marked *)</p>
                    </div>

                    <form autoComplete="off">
                        <div className="row gutter--20">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="degree"
                                        onChange={(e) => this.setState({ degree: e.target.value })}
                                        value={this.state.degree} placeholder="Degree persued *"
                                        className={classnames("form-control", { 'error': errors.degree })}
                                        required="true" aria-invalid="false" />
                                    {errors.degree && (<p className="error-msg">{errors.degree[0]}</p>)}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="school"
                                        onChange={(e) => this.setState({ school: e.target.value })}
                                        value={this.state.school} placeholder="School/Institute name *"
                                        className={classnames("form-control", { 'error': errors.school })}
                                        required="true" aria-invalid="false" />
                                    {errors.school && (<p className="error-msg">{errors.school[0]}</p>)}
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="location"
                                        onChange={(e) => this.setState({ location: e.target.value })}
                                        value={this.state.location} placeholder="Location/Place of institute *"
                                        className={classnames("form-control", { 'error': errors.location })}
                                        required="true" aria-invalid="true" />
                                    {errors.location && (<p className="error-msg">{errors.location[0]}</p>)}
                                </div>

                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="text" name="fieldOfStudy"
                                        onChange={(e) => this.setState({ fieldOfStudy: e.target.value })}
                                        value={this.state.fieldOfStudy}
                                        placeholder="Field of Study *"
                                        className={classnames("form-control", { 'error': errors.fieldOfStudy })}
                                        required="true" aria-invalid="true" />
                                    {errors.fieldOfStudy && (<p className="error-msg">{errors.fieldOfStudy[0]}</p>)}
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
                                    <p className="form-text">End Date (optional *) </p>
                                    <input type="date" name="end"
                                        onChange={(e) => this.setState({ end: e.target.value })}
                                        value={this.state.end}
                                        placeholder="leaving date "
                                        className={classnames("form-control", { 'error': errors.end })}
                                        required="true" aria-invalid="true" />
                                    {errors.end && (<p className="error-msg">{errors.end[0]}</p>)}
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

export default connect(mapStateToProps, {addEdu, clearErrors})(withRouter(EduForm))