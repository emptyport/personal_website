import React, { Component } from 'react';

require('../styles/Social.css');

class Social extends Component {
  render() {
    return (
      <div id="social">
        <div className="icon-container">
          <a className="social-link" href="https://www.linkedin.com/in/mtporter"><span className="icon-linkedin"></span></a>
        </div>
        <div className="icon-container">
          <a className="social-link" href="https://www.twitter.com/MikeTheBiochem"><span className="icon-twitter"></span></a>
        </div>
      </div>
    )
  }
}

export default Social;