import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRoute, Link } from 'react-router-dom'
import {deleteEdu} from '../../actions/profile_actions'

class Education extends Component {
    render() {
        const eduData = this.props.education.map((edu) =>
            (
                <tr key={edu.id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.location}</td>
                    <td className="d--md-block">{edu.start}</td>
                    <td><a onClick={()=>{this.props.deleteEdu(edu.id)}} className="remove"></a></td>
                </tr>
            ))

        return (
            <div className="mt--50">
            
                <table className="table">
                <caption>Institutions Attended</caption>
                    <thead className="ff--primary fs--18 text-black bg-lighter">
                        <tr>
                            <th>Institute</th>
                            <th>Degree</th>
                            <th>location</th>
                            <th className="d--md-block">Start Date</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody className="fs--14 text-darkest">
                        {eduData}
                    </tbody>
                </table>
                <Link to="/add_edu" className="btn btn-default btn-sm"><i className="fa fa-plus"></i> Add Education</Link>
            </div>
        )
    }
}

export default connect(null, {deleteEdu})(Education);