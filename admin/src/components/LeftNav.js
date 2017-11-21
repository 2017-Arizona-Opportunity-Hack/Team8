import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as authAction from "../actions/login";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";

import { withRouter } from "react-router";

import { connect } from "react-redux";

class LeftNav extends Component {
  handleLogout() {
    console.log("in LeftNav >>> logout", this.props);
    this.props.authAction.logout().then(() => {
      window.location.reload();
      // this.props.history.push("/login");
    });
  }

  render() {
    return (
      <div>
        <h5>
          <strong>ADMIN HOME</strong>
        </h5>
        <ul className="list">
          <li>
            <Link to="/child">Children</Link>
          </li>
          <li>
            <Link to="/house">Houses</Link>
          </li>
          <li>
            <Link to="/parent">Parents</Link>
          </li>
          <li>
            <a className="a" onClick={this.handleLogout.bind(this)}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authAction, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeftNav)
);
