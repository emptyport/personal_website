import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

class ImageSelector extends Component {
  
  constructor() {
    super();

    this.state = {
      images: []
    }

    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages = async () => {
    const response = await fetch('/api/fetchAllImages');
    const body = await response.json();

    if (response.status !== 200) throw Error('Could not fetch image list');
    
    return body;
  }

  componentDidMount() {
    this.fetchImages()
      .then(res => this.setState({ images: res.images }))
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
        <div id="image-selector">
          {this.state.images.map((img, index) => {
            return (
              <LazyLoad key={index} debounce={false} offsetVertical={500} >
                <img className="photo" src={'images/thumbnails/'+img.filename} alt={img.alt}/>
              </LazyLoad>
            )
          
          })}
        </div>
      </div>
    )
  }
}

export default ImageSelector;