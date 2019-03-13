import React, { Component } from 'react'

import '../styles/Code.css';

class Code extends Component {
  constructor() {
    super();

    this.state = {
      npm_packages: 12,
      npm_username: 'emptyport',
      github_repos: 39,
      github_username: 'emptyport'
    }

    
  }

  render() {
    return (
      <div id="code">
        <div className="number-container">
          <div className="big-number">
            <h1 className="count">39</h1>
            <div className="number-source">GitHub repos</div>
          </div>

          <div className="big-number">
            <h1 className="count">12</h1>
            <div className="number-source">npm packages</div>
          </div>
        </div>

        <div className="body-text">
          <p>
            I like to write code.
          </p>
          <p>
            My go-to languages are JavaScript and Python, with JavaScript being my favorite.
          </p>
          <p>
            My passion projects are all bioinformatics related. All my npm modules actually have to do with proteomics.
          </p>
          <p>
            Part of why I created this website (besides the sheer fun of doing it) was to showcase my skills as a developer. I worked in a development role for about 7 months while I was at Qualtrics, but it's been a few years. This site is built with a Nodejs and PostgreSQL backend with a React frontend. I wrote the CMS myself and while crude, it gets the job done.
          </p>
          <p>
            My CSS skills aren't exactly great so that's why the site (for now) is pretty plain. I also like the plain look so I might just leave it.
          </p>
        </div>
        



        
      </div>
    )
  }
}

export default Code;