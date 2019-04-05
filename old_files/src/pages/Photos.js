import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class Photos extends Component {

  constructor() {
    super();

    this.state = {
      photoList: [],
      currentImage: 0
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }  
  gotoImage(index) {
    this.setState({
      currentImage: index
    });
  }
  
  componentDidMount() {
    this.callApi()
      .then(res => {
        let photos = res.imgList.map(img => {
          img.src = '/images/'+img.filename;
          img.thumbnail = '/images/thumbnails/'+img.filename;
          img.caption = img.alt;
          return img;
        });
        this.setState({ 
          photoList: photos 
        });
      })
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
        <p className="body-text">These are a few of the photographs I've taken. I strongly favor macro photography of insects and spiders and other small creatures and whatever else suits my fancy.</p>

        {this.state.photoList.length === 0 &&
          <div className="body-text">Super fancy loading message</div>
        }

        <Gallery 
          photos={this.state.photoList} 
          onClick={this.openLightbox} 
        />
        <Lightbox images={this.state.photoList}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          showThumbnails={true}
          onClickThumbnail={this.gotoImage}
        />
      </div>
    )
  }
}

export default Photos;