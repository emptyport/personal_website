import React, { Component } from 'react';
import Viewer from '../components/Viewer';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: ""
    }

    this.fetchPost = this.fetchPost.bind(this);
  }

  fetchPost = async (id) => {
    const response = await fetch('/api/blog/fetch/'+id);
    const body = await response.json();

    if (response.status !== 201) throw Error('Could not fetch posts');

    return body;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchPost(id)
      .then(res => this.setState({ 
        title: res.post.title,
        text: res.post.text
      }))
      .catch(err => console.log(err));
    
  }

  render() {
    return (
      <div>
        <h1 className="body-text body-title">{this.state.title}</h1>
        <div className="body-text">
          <Viewer text={this.state.text} />
        </div>
      </div>
    )
  }

}

export default Article;