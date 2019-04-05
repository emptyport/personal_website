import React, { Component } from 'react';

class ImageUploader extends Component {
  constructor() {
    super();

    this.state = { 
      selectedFile: null,
      title: "",
      alt: "",
      photoPage: "",
      result: ""
    }

    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAltChange = this.handleAltChange.bind(this);
    this.handleDecisionChange = this.handleDecisionChange.bind(this);
  }

  handleDecisionChange = event => {
    this.setState({
      photoPage: event.target.value
    });
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleAltChange = event => {
    this.setState({
      alt: event.target.value
    });
  }

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  handleUpload = async () => {
    const data = new FormData();
    data.append('img', this.state.selectedFile, this.state.selectedFile.name);

    data.append('title', this.state.title);

    data.append('alt', this.state.alt);

    data.append('photoPage', this.state.photoPage);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });
    const result = await response.text();
    this.setState({
      result: result
    });

  }

  render() {
    return (
      <div>
        <input type="file" name="img" id="" onChange={this.handleSelectedFile} />
        Title:<input type="text" onChange={this.handleTitleChange} />
        Alt:<input type="text" onChange={this.handleAltChange} />
        Display with photos (yes/no)?<input type="text" onChange={this.handleDecisionChange} />
        <button onClick={this.handleUpload}>Upload</button>

        <div>{this.state.result}</div>
      </div>
    )
  }

}

export default ImageUploader;