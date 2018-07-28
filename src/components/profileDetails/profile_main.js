import React from 'react'
import { Link } from 'react-router-dom'

const ProfileMain = (profile) => {

    const ps = profile.profile.profileshown

    const exp = ps.experience_set.map((ele) => (
        <React.Fragment key = {ele.id}>
            <dt>
                <p className="h6 fw--700 text-darkest">{ele.title} <span className="ml--10">{ele.start.slice(0, 4)} - {ele.end ? ele.end.slice(0,4) : 'Still Now'}</span></p>
                <p><small className="fw--400 fs--12 text-darker">at {ele.company}, {ele.location}</small></p>
            </dt>
            <dd>
                <p>{ele.description}</p>
            </dd>
        </React.Fragment>
    ))

    const edu = ps.education_set.map((ele) => (
        <React.Fragment key = {ele.id}>
            <dt>
                <p className="h6 fw--700 text-darkest">{ele.degree} in {ele.fieldOfStudy} <span className="ml--10">{ele.start.slice(0, 4)} - {ele.end ? ele.end.slice(0, 4) : 'Still Now'}</span></p>
                <p><small className="fw--400 fs--12 text-darker">at {ele.school}, {ele.location}</small></p>
            </dt>
            <dd>
                <p>{ele.description}</p>
            </dd>
        </React.Fragment>
    ))
    return (
        <React.Fragment>
            <div className="profile--item">
                <div className="profile--heading">
                    <h3 className="h4 fw--700">
                        <span className="mr--4">Profile</span>
                        <i className="ml--10 text-primary fa fa-caret-right"></i>
                    </h3>
                </div>

                <div className="profile--info">
                    <table className="table">
                        <tbody><tr>
                            <th className="fw--700 text-darkest">Full Name</th>
                            <td><Link to={`/profile/${ps.handel}`} className="btn-link">{ps.fullname}</Link></td>
                        </tr>
                            <tr>
                                <th className="fw--700 text-darkest">Skills</th>
                                <td>{ps.skills.join(', ')}</td>
                            </tr>
                            <tr>
                                <th className="fw--700 text-darkest">Status</th>
                                <td>{ps.status}</td>
                            </tr>
                        </tbody></table>
                </div>
            </div>
            <div className="profile--item">
                <div className="profile--heading">
                    <h3 className="h4 fw--700">
                        <span className="mr--4">Biography</span>
                        <i className="ml--10 text-primary fa fa-caret-right"></i>
                    </h3>
                </div>

                <div className="profile--info">
                    <p>{ps.bio}</p>
                </div>
            </div>
            <div className="profile--item">
                <div className="profile--heading">
                    <h3 className="h4 fw--700">
                        <span className="mr--4">Work Experience</span>
                        <i className="ml--10 text-primary fa fa-caret-right"></i>
                    </h3>
                </div>

                <div className="profile--info">
                    <dl>
                        {exp}
                    </dl>
                </div>
            </div>
            <div className="profile--item">
                <div className="profile--heading">
                    <h3 className="h4 fw--700">
                        <span className="mr--4">Education</span>
                        <i className="ml--10 text-primary fa fa-caret-right"></i>
                    </h3>
                </div>

                <div className="profile--info">
                    <dl>
                        {edu}
                    </dl>
                </div>
            </div>

            <div className="profile--item">
                <div className="profile--heading">
                    <h3 className="h4 fw--700">
                        <span className="mr--4">Social/Contact</span>
                        <i className="ml--10 text-primary fa fa-caret-right"></i>
                    </h3>
                </div>

                <div className="profile--info">
                    <table className="table">
                        <tbody><tr>
                            <th className="fw--700 text-darkest">Phone</th>
                            <td><a href="tel:+16105598246">+1610-559-8246</a></td>
                        </tr>
                            <tr>
                                <th className="fw--700 text-darkest">E-mail</th>
                                <td><a href="mailto:demo@fakemail.com">{ps.user.email}</a></td>
                            </tr>
                            <tr>
                                <th className="fw--700 text-darkest">Website</th>
                                <td><a target = "_blank" href={ps.website}>{ps.website}</a></td>
                            </tr>
                            <tr>
                                <th className="fw--700 text-darkest">LinkedIn</th>
                                <td><a target = "_blank" href={ps.linkedIn}>{ps.linkedIn}</a></td>
                            </tr>
                            <tr>
                                <th className="fw--700 text-darkest">Address</th>
                                <td>{ps.location}</td>
                            </tr>
                        </tbody></table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileMain
