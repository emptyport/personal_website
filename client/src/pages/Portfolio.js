import React, { Component } from 'react';
import PortfolioItem from '../components/PortfolioItem';

import '../styles/Portfolio.css';

// Dissidence
const dissidenceImage = require('../image_assets/dissidence_screenshot.png');
const dissidenceAlt = "Screenshot of the Dissidence Reno mock site";
const dissidenceTitle = "Concept Site for Dissidence Reno";
const dissidenceDescription = "This is the description";


// Old personal website
const oldImage = require('../image_assets/old_website_screenshot.png');
const oldAlt = "Screenshot of my old static website";
const oldTitle = "My Previous Personal Website";
const oldDescription = "This is the description for my old website";

// AIMS
const aimsImage = require('../image_assets/aims_screenshot.png');
const aimsAlt = "Screenshot of the Age and Integrative Medicine Society website";
const aimsTitle = "Website for the Age and Integrative Medicine Society";
const aimsDescription = "This is the description for AIMS";

const aimsBrochureImage = require('../image_assets/AIMS_brochure_winter_2019.jpg');
const aimsBrochureAlt = "Screenshot of the AIMS brochure";
const aimsBrochureTitle = "Brochure for the Age and Integrative Medicine Society";
const aimsBrochureDescription = "This is the description for the AIMS brochure";


class Portfolio extends Component {
  render () {


    return (
      <div id="portfolio">

        <PortfolioItem 
          title={dissidenceTitle}
          image={dissidenceImage}
          alt={dissidenceAlt}
          description={dissidenceDescription} 
        />

        <PortfolioItem 
          title={oldTitle}
          image={oldImage}
          alt={oldAlt}
          description={oldDescription} 
        />

        <PortfolioItem 
          title={aimsTitle}
          image={aimsImage}
          alt={aimsAlt}
          description={aimsDescription} 
        />

        <PortfolioItem 
          title={aimsBrochureTitle}
          image={aimsBrochureImage}
          alt={aimsBrochureAlt}
          description={aimsBrochureDescription} 
        />

      </div>
    )
      
  }
}

export default Portfolio;