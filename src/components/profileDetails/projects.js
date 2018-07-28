import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from '../../utils/is_empty'
import Spinner from '../common/spinner'

class projects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clientId: '8c6e5cf6ca6f332175e7',
            clientSecret: '9c32c353b286d7bda7e26fd08f11bb5e4fe08b11',
            count: 5,
            sort: 'created: asc',
            repos: null
        }
    }

    componentDidMount() {
        const { gitusername } = this.props.profile.profileshown

        const { count, sort, clientId, clientSecret } = this.state

        fetch(`https://api.github.com/users/${gitusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {this.setState({ repos: data }) })
            .catch(data =>  {this.setState({ repos: [] }) })
    }

    render() {
        console.log(this.state)
        if(this.state.repos == null)
            return <Spinner />

        else if(this.state.repos.length == 0 || !Array.isArray(this.state.repos))
            return <div>No projects to show</div>

        const rows = this.state.repos.map((ele) => (
        <tr key = {ele.id} style={{borderTop:'1px solid #e5e5e5'}}>
            <td>
                <h4 className="h6 fw--500 text-darkest"><a href={ele.html_url} target="_blank" className="btn-link">{ele.name}</a></h4>

                <p>{ele.description}</p>
                <ul className="subforums nav mt--10 text-darkest">
                    <li><i style={{paddingTop:'5px'}}className="fa fa-circle-thin mr--10 text-primary"></i></li>
                    <li><Link to="#">{ele.language?ele.language:'Scratch'}</Link></li>
                </ul>
            </td>
            <td>
                <p className="ff--primary fw--500 fs--14 text-darkest">{ele.stargazers_count}</p>
            </td>
            <td>
                <p className="ff--primary fw--500 fs--14 text-darkest">{ele.watchers_count}</p>
            </td>
            <td>
                <p className="ff--primary fw--500 fs--14 text-darkest">{ele.updated_at.slice(0,10)}</p>
            </td>
        </tr>))

        return (
            <div className="topics--list">
                <table className="table">
                    <thead className="ff--primary fs--14 text-darkest">
                        <tr>
                            <th>Latest Github repos</th>
                            <th>Stars</th>
                            <th>Watchers</th>
                            <th>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default projects


