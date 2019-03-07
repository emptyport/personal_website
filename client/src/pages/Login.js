import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  }

  handleLogin = () => {
    let data = this.state;
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      }
      else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in');
    });

  }

  render() {
    return (
      <div>
        <div>
          Username:<input type="text" onChange={this.handleUsernameChange} />
        </div>
        <div>
          Password:<input type="text" onChange={this.handlePasswordChange} />
        </div>
        <div>
          <button onClick={this.handleLogin}>Login</button>
        </div>
      </div>
    )
  }

}

export default Login;