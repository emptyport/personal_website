import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

class PhotoItem extends Component {
  
  render() {
    return (
      <LazyLoad debounce={false} offsetVertical={500} >
        <img className="photo" src={'images/'+this.props.imgSrc.filename} alt={this.props.imgSrc.alt}/>
      </LazyLoad>
    )
  }
}

export default PhotoItem;