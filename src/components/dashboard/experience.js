import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteExp} from '../../actions/profile_actions'

class Experience extends Component {
    render() {
        const expData = this.props.experience.map((exp) =>
            (
                <tr key={exp.id}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>{exp.location}</td>
                    <td className="d--md-block">{exp.start}</td>
                    <td><a onClick={()=>{this.props.deleteExp(exp.id)}} className="remove"></a></td>
                </tr>
            ))

        return (
            <div className="mt--50">
            
                <table className="table">
                <caption>Work Experiences</caption>
                    <thead className="ff--primary fs--18 text-black bg-lighter">
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>location</th>
                            <th className="d--md-block">Start Date</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody className="fs--14 text-darkest">
                        {expData}
                    </tbody>
                </table>
                <Link to="/add_exp" className="btn btn-default btn-sm"><i className="fa fa-plus"></i> Add Experience</Link>
            </div>
        )
    }
}

export default connect(null, {deleteExp})(Experience);