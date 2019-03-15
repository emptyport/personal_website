import React, { Component } from 'react';

require('../styles/Contact.css');

class Contact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    hidden: ''
  };
  
  handleSubmit = async e => {
    e.preventDefault();

    if(this.state.hidden.length > 0) {
      alert('Domo origato, Mr. Roboto');
      return;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
    const body = await response.text();
    alert(body);
  };

  render() {
    return (
      <div id="contact">
        <div className="contact-intro">
          <p>Hi there!</p>
          <p>Want to get in touch?</p>
          <p>Have a burning question for me?</p>
          <p>Are you an internet troll that just can't stand the fact that my website doesn't have a commenting system but you still have something to say to me?</p>
          <p>Then you're in the right place! Fill out the form below and I'll get back to you as soon as I can!</p>
        </div>

        <div id="contact-form">
          <input className="contact-form-item" type="text" placeholder="First Name" onChange={e=>this.setState({firstName: e.target.value})}></input>
          <input className="contact-form-item" type="text" placeholder="Last Name" onChange={e=>this.setState({lastName:e.target.value})}></input>
          <input className="contact-form-item" type="text" placeholder="Email" onChange={e=>this.setState({email:e.target.value})}></input>
          <input className="contact-form-item" id="hidden-input" type="text" onChange={e=>this.setState({hidden:e.target.value})}></input>
          <textarea id="contact-form-textarea" className="contact-form-item" placeholder="Your message goes here!" onChange={e=>this.setState({message:e.target.value})}></textarea>
          <button id="contact-form-button" className="contact-form-item" onClick={this.handleSubmit}>Submit</button>
        </div>

      </div>
    )
  }

}

export default Contact;