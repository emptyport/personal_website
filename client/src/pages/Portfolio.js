import React, { Component } from 'react';
import PortfolioItem from '../components/PortfolioItem';

import '../styles/Portfolio.css';

// Scorpion Poster
const scorpionImage = require('../image_assets/scorpion_poster_final_updated.jpg');
const scorpionAlt = "Research poster on scorpion fluorescence";
const scorpionTitle = "Scorpion Fluorescence Research Poster";
const scorpionDescription = "For much of my time at BYU I did research on scorpion fluorescence, or their ability to 'glow' under a blacklight. I made this research poster to present our research and won first prize in a poster competition hosted by the university's library. This poster was very much a collaborative project. Jeff Macedone, my primary mentor on the project, taught me a lot about keeping the word count and jargon to a minimum to attract viewers and capturing attention with striking graphics. But at the same time we needed enough information to communicate what we did and what we found out. Unfortunately we weren't able to get a paper published because we ended up having too few data points to account for all the assorted variables. Hopefully this project will get finished out someday though.";

// Dissidence
const dissidenceLink = "https://dissidence-reno.netlify.com";
const dissidenceImage = require('../image_assets/dissidence_screenshot.png');
const dissidenceAlt = "Screenshot of the Dissidence Reno mock site";
const dissidenceTitle = "Concept Site for Dissidence Reno";
const dissidenceDescription = "As practice I thought it would be fun to design a mock website for my cousin's band Dissidence. They describe themselves as 'anarchist-charged crust meets death metal' so I wanted to try and make a website with that sort of feeling. I kept the color scheme black and white and I choose some grungy looking fonts. I took their logo, vectorized it so I could make a higher resolution version, and then I added a glitch effect. Once again I used Jekyll but this time the site is hosted on Netlify.";


// Old personal website
const oldLink = "https://emptyport.github.io";
const oldImage = require('../image_assets/old_website_screenshot.png');
const oldAlt = "Screenshot of my old static website";
const oldTitle = "My Previous Personal Website";
const oldDescription = "My previous personal website is a simple static website. I wanted to go with something bright and simple so the layout I went with was five separate tabs, each with a different background color. On the technical side of things I used Jekyll to generate the finished pages and it is hosted on GitHub pages.";

// AIMS
const aimsLink = "https://www.aimshigher.org";
const aimsImage = require('../image_assets/aims_screenshot.png');
const aimsAlt = "Screenshot of the Age and Integrative Medicine Society website";
const aimsTitle = "Website for the Age and Integrative Medicine Society";
const aimsDescription = "This website design was part of a rebranding effort for a non-profit. I started with a logo refresh, moving from an altered stock logo to something more clean looking. I kept the colors, blue and green, but simplified the logo and kept it nice and simple. From there I tackled the website. It is a WordPress website so I stuck with that. I found a new theme, customized it, and then updated the social media profiles to match. I had no previous experience with WordPress and I do not like PHP, so none of the theme customizations actually involved any of the underlying code. I just used the visual customizer and added a little custom CSS. The site still doesn't score great on Google PageSpeed Insights, but it's doing better and I'm slowly adding in improvements.";

const aimsBrochureImage = require('../image_assets/AIMS_brochure_winter_2019.jpg');
const aimsBrochureAlt = "Screenshot of the AIMS brochure";
const aimsBrochureTitle = "Brochure for the Age and Integrative Medicine Society";
const aimsBrochureDescription = "To go along with the new website for the Age and Integrative Medicine Society, I designed a brochure to help increase awareness of their mission and hopefully get some donations. I hit up some free stock image websites to get all the portraits and then setup the photo grid. The idea behind the grid is to help show that aging is universal and it affects all of us.";


class Portfolio extends Component {
  render () {


    return (
      <div id="portfolio">

        <PortfolioItem
          title={scorpionTitle}
          image={scorpionImage}
          link={scorpionImage}
          alt={scorpionAlt}
          description={scorpionDescription}
        />

        <PortfolioItem 
          title={oldTitle}
          image={oldImage}
          link={oldLink}
          alt={oldAlt}
          description={oldDescription} 
        />

        <PortfolioItem 
          title={dissidenceTitle}
          image={dissidenceImage}
          link={dissidenceLink}
          alt={dissidenceAlt}
          description={dissidenceDescription} 
        />

        <PortfolioItem 
          title={aimsTitle}
          image={aimsImage}
          link={aimsLink}
          alt={aimsAlt}
          description={aimsDescription} 
        />

        <PortfolioItem 
          title={aimsBrochureTitle}
          image={aimsBrochureImage}
          link={aimsBrochureImage}
          alt={aimsBrochureAlt}
          description={aimsBrochureDescription} 
        />

      </div>
    )
      
  }
}

export default Portfolio;