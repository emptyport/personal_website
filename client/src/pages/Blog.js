import React, { Component } from 'react';
import Viewer from '../components/Viewer';

import '../styles/Blog.css';

class BlogItem extends Component {
  
  render() {
    return (
      <div className="blog-item">
        <h1><a href={"/blog/"+(parseInt(this.props.id))}>{this.props.title}</a></h1>
        <Viewer text={this.props.text.substring(0, 100)} />
      </div>
    )
  }
}

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
    this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
  }
  
  componentDidMount() {
    this.fetchBlogPosts()
      .then(res => this.setState({ posts: res.posts }))
      .catch(err => console.log(err));
  }

  fetchBlogPosts = async () => {
    const response = await fetch('/api/blog/fetchPosts');
    const body = await response.json();

    if (response.status !== 201) throw Error('Could not fetch posts');

    return body;
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => {
          return <BlogItem title={post.title} text={post.text} key={post.id} id={post.id} />
        })}
      </div>
    )
  }

}

export default Blog;