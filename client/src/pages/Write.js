import React, { Component } from 'react';
import Editor from '../components/Editor';
import ImageSelector from '../components/ImageSelector';

class Write extends Component {

  render() {
    return (
      <div>
        This is the writing page
        <Editor />
        <ImageSelector />
      </div>
    )
  }

}

export default Write;