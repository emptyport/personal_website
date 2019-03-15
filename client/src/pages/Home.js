import React, { Component } from 'react';

import '../styles/Home.css';

class Home extends Component {

  render() {
    return (
      <div id="home">
        <div className="home-item">Hello!</div>
        <div className="home-item">My name is Michael Porter and this is my website!</div>
        <div className="home-item">The entire website is built from the ground up with love. If things look a little plain, that's because 1) it's still a work in progress and 2) I'm still learning.</div>
        <div className="home-item">I tend to think of myself as an interesting person, so we'll see if you think the same about me after having a look around.</div>
      </div>
    )
  }

}

export default Home;