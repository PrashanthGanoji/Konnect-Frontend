import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import isEmpty from '../../utils/is_empty'

export class FindPeople extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            skills: '',
            location: ''
        }
    }

    submitData = () => {
        const {name, skills, location} = this.state
        console.log(name,skills,location)
    let queryList = []
    if(!isEmpty(name))
        queryList.push(`name=${name}`)
    if(!isEmpty(skills))
        queryList.push(`skills=${skills}`)
    if(!isEmpty(location))
        queryList.push(`location=${location}`)
    
    console.log(queryList)
    const queryString = queryList.join('&')

    let url = `/profile_list`
    if(!isEmpty(queryString))
        url = url+'?'+queryString;
    console.log(url)
    console.log(this.props)
    this.props.history.push(url)
    }

    render() {
        return (
            <div className="widget">
                <h2 className="h4 fw--700 widget--title">Find People</h2>

                <div className="buddy-finder--widget">
                    <form action="#" autoComplete="off">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>
                                        <span className="text-darker ff--primary fw--500">by Name</span><input onChange={(e) => { this.setState({ name: e.target.value }) }} value={this.state.name} className="form-control form-sm" placeholder="name" type="text" name="name" />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>
                                        <span className="text-darker ff--primary fw--500">by Skill Set</span><input onChange={(e) => { this.setState({ skills: e.target.value }) }} value={this.state.skills} className="form-control form-sm" placeholder="skill set" type="text" name="name" />
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>
                                        <span className="text-darker ff--primary fw--500">by Location</span><input onChange={(e) => { this.setState({ location: e.target.value }) }} value={this.state.location} className="form-control form-sm" placeholder="location" type="text" name="name" />
                                    </label>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <button onClick={(e) => { e.preventDefault(); this.submitData() }} className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
}

export default connect(null, mapDispatchToProps)(withRouter(FindPeople))