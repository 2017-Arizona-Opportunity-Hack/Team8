import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LeftNav extends Component {
  handleLogout() {
    console.log('in LeftNav >>> logout');
  }

  render() {

    return (
      <div>
        <h5><strong>ADMIN HOME</strong></h5>
        <ul className="list">
          <li><Link to="/">Children</Link></li>
          <li><Link to="/house">Houses</Link></li>
          <li><Link to="/parent">Parents</Link></li>
          <li><a onClick={this.handleLogout.bind(this)}>Logout</a></li>
        </ul>
      </div>

    );

  }

}

export default LeftNav;
