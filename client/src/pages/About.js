import React, { Component } from 'react';

import '../styles/About.css';
import SpiderPortrait from '../image_assets/spider_portrait.png';
import SciencePortrait from '../image_assets/science_portrait.png';

class About extends Component {

  render() {
    return (
      <div id="about">
        <img id="spider-pic" src={SpiderPortrait} />
        <ul className="about-list">
          <li>
            I like coding
          </li>
          <li>
            I like science
          </li>
          <li>
            I like photography
          </li>
          <li>
            I like bugs
          </li>
        </ul>
        <img id="science-pic" src={SciencePortrait} />
      </div>
    )
  }

}

export default About;