import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <section className="banner--section">
                <div className="banner--item bg--img" data-overlay="0.75"
                    style={{ backgroundImage: `url(${require('../img/banner-img/home-version-1/slider-bg-01.jpg')})` }}>
                    <div className="vc--parent">
                        <div className="vc--child">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 col-md-offset-1">
                                        <div className="banner--content pt--70 pb--80 text-center">
                                            <div className="title">
                                                <h1 className="h1 text-lightgray">Welcome To Community</h1>
                                            </div>
                                            <div className="sub-title">
                                                <h2 className="h2 text-lightgray">Connect, Share &amp; Engage</h2>
                                            </div>
                                            <div className="desc text-gray fs--16">
                                                <p>
                                                    Konnect is a professional networking app. It serves as a platform for showcasing peoples work and managing professional identity.It helps in building professional network. It also serves as an online portfolio site </p> 
                                            </div>
                                            <div className="action text-uppercase">
                                                <Link to="/login" className="btn btn-white">Login</Link>
                                                <Link to="/signup" className="btn btn-primary">Sign Up Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Landing;



/*
import img1 from '../img/banner-img/home-version-1/slider-bg-01.jpg'
import img2 from '../img/banner-img/home-version-1/slider-bg-02.jpg'
import img3 from '../img/banner-img/home-version-1/slider-bg-03.jpg'
*/