import React, { Component } from 'react';

import '../styles/Home.css';

let earthVid = require('../image_assets/earth_rotating.mp4');

class Home extends Component {


  render() {
    return (
      <div id="home">
        <h1 className="home-item">Hey!</h1>
        <h2 className="home-item">My name is Michael Porter and this is my website!</h2>
        <video id="home-video" autoPlay loop>
          <source src={earthVid} type="video/mp4" />
          Your browser does not support this video :(
        </video>
        
      </div>
    )
  }

}

export default Home;