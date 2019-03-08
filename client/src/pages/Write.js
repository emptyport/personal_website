import React, { Component } from 'react';
import Editor from '../components/Editor';
import Viewer from '../components/Viewer';
import ImageSelector from '../components/ImageSelector';

import '../styles/Write.css';

class Write extends Component {

  constructor() {
    super();

    let initialText = 
`
# New Post
      
Write something here
`
    ;

    this.state = {
      text: initialText
    }

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange = (text) => {
    this.setState({
      text: text
    });
  }

  render() {
    return (
      <div className="blog-writer">
        <Editor text={this.state.text} textCallback={this.handleTextChange} />
        <Viewer text={this.state.text} />
        <ImageSelector />
      </div>
    )
  }

}

export default Write;