import React, { Component } from 'react';
import Editor from '../components/Editor';
import Viewer from '../components/Viewer';
import ImageSelector from '../components/ImageSelector';

import '../styles/Write.css';

class Write extends Component {

  constructor() {
    super();

    let initialText = 
`# New Post
      
Write something here
`
    ;

    this.state = {
      text: initialText,
      title: ""
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.savePost = this.savePost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  }

  savePost = async () => {
    let data = {
      text: this.state.text,
      title: this.state.title
    }
    const response = await fetch('/api/blog/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.text();
    alert(result);
  }

  handleTextChange = (text) => {
    this.setState({
      text: text
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.savePost}>Save</button>
        <br />
        Title:<input type="text" onChange={this.handleTitleChange}></input>
        <div className="blog-writer">
          <div className="writer-item">
            <Editor text={this.state.text} textCallback={this.handleTextChange} />
          </div>
          <div className="writer-item">
            <Viewer text={this.state.text} />
          </div>
          <div className="writer-item">
            <ImageSelector />
          </div>
        </div>
      </div>
      
    )
  }

}

export default Write;