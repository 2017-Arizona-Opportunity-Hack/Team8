import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as childAction from "../actions/child";

class HouseForm extends Component {
  logResponse(values) {
    console.log(values);
    values.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>House Information</b>
        </div>
        <form className="form-horizontal" onSubmit={this.logResponse}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="hname" className="col-lg-2 control-label">
                House Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="name"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the house name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="haddress" className="col-lg-2 control-label">
                House Address:
              </label>
              <div className="col-lg-10">
                <Field
                  name="address"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the house address"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-outline-info">
                  Submit
                </button>{" "}
                &nbsp;
                <Link to="/house" className="btn btn-outline-info">
                  Cancel
                </Link>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    children: state.children
  };
}

function mapDispatchToProps(dispatch) {
  return {
    childAction: bindActionCreators(childAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "client" })(HouseForm)
);
