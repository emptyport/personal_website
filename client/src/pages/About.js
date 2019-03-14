import React, { Component } from 'react';

import '../styles/About.css';
import SpiderPortrait from '../image_assets/spider_portrait.png';
import SciencePortrait from '../image_assets/science_portrait.png';

class About extends Component {

  render() {
    return (
      <div id="about">
        <img id="spider-pic" src={SpiderPortrait} alt="Mike holding a tarantual and pretending to yell"/>
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
        <img id="science-pic" src={SciencePortrait} alt="Mike wearing a shirt that says to stand back because he is going to try science" />
      </div>
    )
  }

}

export default About;