import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getProfileShown, unloadProfileShown } from '../../actions/profile_actions'
import Spinner from '../common/spinner'
import Banner from '../profileDetails/banner'
import FindPeople from '../profileDetails/sidebar_search'
import Projects from '../profileDetails/projects'
import ProfileMain from '../profileDetails/profile_main'
import Posts from '../profileDetails/posts'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NotFound from '../../components/common/not_found'
import FriendList from '../../components/profileDetails/friends'
import isEmpty from '../../utils/is_empty'

class ProfileDetails extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileShown(this.props.match.params.handle)
        }
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.handle != this.props.match.params.handle)
        {
            this.props.getProfileShown(this.props.match.params.handle)
        }
    }

    componentWillUnmount(){
        this.props.unloadProfileShown()
    }


    render() {
        
        if (this.props.profileShown.profileshown == null) {
            return <Spinner/>
        }
        else if(isEmpty(this.props.profileShown.profileshown))
        {
            return <NotFound />
        }
        return (
            <div>
                <Banner profile={this.props.profileShown}/>
                <section className="page--wrapper pt--50 pb--20" style={{ transform: 'none' }}>
                    <div className="container" style={{ transform: 'none' }}>
                        <div className="row" style={{ transform: 'none' }}>
                            <div className="main--content col-md-8 pb--60" data-trigger="stickyScroll" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>

                                <div className="theiaStickySidebar" style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}>
                                    <Tabs defaultIndex={0} className="main--content-inner drop--shadow">
                                        <div className="content--nav pb--30">
                                            <TabList className="nav ff--primary fs--14 fw--500 bg-lighter">
                                                <Tab selectedClassName='active'><a >Profile</a></Tab>
                                                <Tab selectedClassName='active'><a >Projects</a></Tab>
                                                <Tab selectedClassName='active'><a >Posts</a></Tab>
                                                <Tab selectedClassName='active'><a >Friends</a></Tab>
                                            </TabList>
                                        </div>
                                        <TabPanel className="profile--details fs--14">
                                            <ProfileMain profile={this.props.profileShown} />
                                        </TabPanel>
                                        <TabPanel className='topics--list'>
                                            <Projects profile = {this.props.profileShown}/>
                                        </TabPanel>
                                        <TabPanel className="row">
                                            <Posts />
                                        </TabPanel>
                                        <TabPanel >
                                            <FriendList profile = {this.props.profileShown}/>
                                        </TabPanel>
                                    </Tabs>

                                    <div className="resize-sensor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div className="resize-sensor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0px', top: '0px', transition: '0s', width: '657px', height: '1177px' }}></div></div><div className="resize-sensor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', zIndex: '-1', visibility: 'hidden' }}><div style={{ position: 'absolute', left: '0', top: '0', transition: '0s', width: '200%', height: '200%' }}></div></div></div></div></div>

                            <div className="main--sidebar col-md-4 pb--60" data-trigger="stickyScroll" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>

                                <div className="theiaStickySidebar" style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}>

                                    <FindPeople />

                                    <div className="widget">
                                        <h2 className="h4 fw--700 widget--title">Notice</h2>

                                        <div className="text--widget">
                                            <p>You can find people by name alone or skill set alone or can fill all those up and try to find pople meeting those criteria</p>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    currentProfile: state.currentProfile,
    profileShown: state.profileShown
})

const mapDispatchToProps = {
    getProfileShown: getProfileShown,
    unloadProfileShown:unloadProfileShown
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileDetails))
