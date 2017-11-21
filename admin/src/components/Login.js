import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as loginAction from "../actions/login";

const renderField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        {...input}
        placeholder={label}
        id={id}
        type={type}
        className="form-control"
      />{" "}
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error_type: 0 };
  }
  handleLogin = values => {
    // console.log('in handleLogin >>> values', values);
    // console.log('in handleLogin >>> props', this.props);
    let email = values.email;
    let password = values.password;
    this.props.loginAction.login(email, password).then(state => {
      if (state.value.data.success == 1) {
        // this.props.history.remove("/login");
        // this.props.history.pop();
        // this.props.history.push("/");
        window.location.reload();
        this.props.history.push("/child");
      } else {
        var err = state.value.data.errorMessage;
        if ((err = "no admin")) {
          this.setState({ error_type: 1 });
        } else if ((err = "wrong password")) {
          this.setState({ error_type: 2 });
        }
      }
    });
  };

  render() {
    console.log("in Login >>> ", this.props);
    const { error } = this.props;

    return (
      <div className="card card-container">
        <img
          id="profile-img"
          alt="profile"
          className="profile-img"
          src="../images/logo.png"
        />

        <p id="profile-name" />

        <form
          onSubmit={this.props.handleSubmit(this.handleLogin)}
          className="form-signin"
        >
          <Field
            id="email"
            name="email"
            type="email"
            component={renderField}
            label="email"
          />
          <Field
            id="password"
            name="password"
            type="password"
            component={renderField}
            label="password"
          />{" "}
          {error && <strong>{error}</strong>}
          <br />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block btn-signin"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: "login" })(Login)
);
