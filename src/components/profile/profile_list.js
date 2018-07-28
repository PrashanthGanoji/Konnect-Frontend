import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { getAllProfilesWithParams, clearAllProfiles, getCurrentProfile } from '../../actions/profile_actions'
import Spinner from '../common/spinner'
import ProfileItem from './profile_item'
import isEmpty from '../../utils/is_empty';
import { FindPeople } from '../profileDetails/sidebar_search';

class ProfileList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      itemsPerPage: 8
    }
  }

  changePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.props.getAllProfilesWithParams(this.props.location.search)
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile()
    }
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.location.search
    let newId = this.props.location.search
    if (newId !== oldId)
      this.props.getAllProfilesWithParams(this.props.location.search)
  }

  componentWillUnmount() {
    this.props.clearAllProfiles()
  }

  render() {
    const { profiles, loading, selectedProfile } = this.props.currentProfile
    const { currentPage, itemsPerPage } = this.state

    let content;
    let renderPageNumbers;

    if (loading || profiles == null) {
      content = <Spinner />
    }
    else {
      if (isEmpty(profiles)) {
        content = <div>No results</div>
      }
      else {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(profiles.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }

        renderPageNumbers = pageNumbers.map((element) => {
          return (
            <a onClick={this.changePage}  id={element} className={"btn-link" + ((element == currentPage) ? " btn-primary" : '')} style={{color:((element == currentPage) ? "white" : '#1da1f2')}}>{element}</a>
          )
        })

        const indexOfLastProfile = currentPage * itemsPerPage;
        const indexOfFirstProfile = indexOfLastProfile - itemsPerPage;
        const pageProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

        content = pageProfiles.map((profile) => (
          <ProfileItem key={profile.user.id} auth={this.props.auth} selectedProfile={selectedProfile} profile={profile} />
        ))
      }
    }
    return (
      <div className="container">
        <section className="page--wrapper pt--40 pb--20" style={{ transform: 'none' }}>
          <div className="container" style={{ transform: 'none' }}>
            <div className="row" style={{ transform: 'none' }}>
              <div className="main--content col-md-8 pb--60" data-trigger="stickyScroll" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>

                <div className="theiaStickySidebar" style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}><div className="main--content-inner drop--shadow">

                  {content}

                  <div class="page--count pt--30">
                    <label class="ff--primary fs--14 fw--500 text-darker">
                      {renderPageNumbers}
                    </label>
                  </div>
                </div><div className="resize-sensor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div className="resize-sensor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0px', top: '0px', transition: '0s', width: '657px', height: '1177px' }}></div></div><div className="resize-sensor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0', top: '0', transition: '0s', width: '200%', height: '200%' }}></div></div></div></div></div>

              <div className="main--sidebar col-md-4 pb--60" data-trigger="stickyScroll" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>

                <div className="theiaStickySidebar" style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}>


                  <FindPeople history={this.props.history} />

                  <div className="widget">
                    <h2 className="h4 fw--700 widget--title">Notice</h2>

                    <div className="text--widget">
                      <p>You can find people by name alone or skill set alone or can fill all those up and try to find all pople meeting those criteria</p>
                    </div>
                  </div>
                  <div className="resize-sensor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div className="resize-sensor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0px', top: '0px', transition: '0s', width: '334px', height: '1354px' }}></div></div><div className="resize-sensor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0', top: '0', transition: '0s', width: '200%', height: '200%' }}></div></div></div></div></div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = {
  clearAllProfiles: clearAllProfiles,
  getAllProfilesWithParams: getAllProfilesWithParams,
  getCurrentProfile: getCurrentProfile
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileList))
