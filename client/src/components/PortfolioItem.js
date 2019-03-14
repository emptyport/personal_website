import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

class PortfolioItem extends Component {
  
  render() {
    return (
      <div className="portfolio-item">
        <h1 className="portfolio-item-title">{this.props.title}</h1>
        <LazyLoad debounce={false} offsetVertical={500} >
          <img className="portfolio-item-image" src={this.props.image} alt={this.props.alt}/>
        </LazyLoad>
        <div className="portfolio-item-description">{this.props.description}</div>
      </div>    
    )
  }
}

export default PortfolioItem;