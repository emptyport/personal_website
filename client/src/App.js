import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Code from './pages/Code';
import Photos from './pages/Photos';

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
        </div>
        
        <Footer className="footer"/>
      </div>
    );
  }
}

export default App;
