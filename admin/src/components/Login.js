import React, { Component } from 'react';

class Login extends Component {

  render() {
    console.log('in Login >>> ', this.props);

    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <p>Login</p>
          </div>
        </div>
      </div>
    );

  }

}

export default Login;
