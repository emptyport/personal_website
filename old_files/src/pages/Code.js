import React, { Component } from 'react'

import '../styles/Code.css';

class Code extends Component {
  constructor() {
    super();

    this.state = {
      npm_packages: 12,
      npm_username: 'emptyport',
      github_repos: 40,
      github_username: 'emptyport'
    }    
  }

  render() {
    return (
      <div id="code">
        <div className="number-container">
          <div className="big-number">
            <h1 className="count">{this.state.github_repos}</h1>
            <div className="number-source"><a href="https://www.github.com/emptyport">GitHub repos</a></div>
          </div>

          <div className="big-number">
            <h1 className="count">{this.state.npm_packages}</h1>
            <div className="number-source"><a href="https://www.npmjs.org/~emptyport">npm packages</a></div>
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
            Part of why I created this website (besides the sheer fun of doing it) was to showcase my skills as a developer. I worked in a development role for about 7 months while I was at Qualtrics, but it's been a few years. This site is built with a Nodejs and PostgreSQL backend with a React frontend. I wrote the CMS myself and while crude, it gets the job done.
          </p>
        </div>
        



        
      </div>
    )
  }
}

export default Code;