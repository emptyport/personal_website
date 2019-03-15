import React, { Component } from 'react';
import Social from './Social';

require('../styles/Footer.css');

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Social />
                <p id="copyright">Copyright 2019</p>
            </div>
        )
    }
}

export default Footer;