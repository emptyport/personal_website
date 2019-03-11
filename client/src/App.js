import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Here are the pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Code from './pages/Code';
import Photos from './pages/Photos';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Article from './pages/Article';

// These are pages for me and require authentication
import WithAuth from './components/WithAuth';
import ImageUploader from './pages/ImageUploader';
import Login from './pages/Login';
import Write from './pages/Write';

import './App.css';

class App extends Component {
 

  render() {
    return (
      <div className="App">
        <Navbar className="nav"/>
        
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/code" component={Code} />
          <Route exact path="/photos" component={Photos} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/blog" component={Blog} />
          <Route path="/blog/:id" component={Article} />

          <Route exact path="/upload" component={WithAuth(ImageUploader)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/write" component={Write} />
        </div>
        
        <Footer className="footer"/>
      </div>
    );
  }
}

export default App;
