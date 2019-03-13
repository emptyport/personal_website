import React, { Component } from 'react';
import PhotoItem from '../components/PhotoItem';

class Photos extends Component {

  state = {
    photoList: []
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ 
        photoList: res.imgList 
      }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/listImages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="photo-container">
        <p>These are a few of the photographs I've taken. I strongly favor macro photography of insects and spiders and other small creatures. I'm still building out my website so for now my images don't have alt tags unfortunately.</p>

        {this.state.photoList.length === 0 &&
          <div>Loading</div>
        }

        {this.state.photoList.map((img, index) => {
          return <PhotoItem key={index} imgSrc={img} />
        })}
      </div>
    )
  }
}

export default Photos;