import React, { Component } from 'react';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
    this.props.textCallback(event.target.value);
  }

  render() {
    return (
      <div>
        <textarea id="editor" value={this.state.text} onChange={this.handleTextChange} autoFocus></textarea>
      </div>
    )
  }
}

export default Editor;