import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as childAction from "../actions/child";

import HouseOption from "./HouseOption";

const required = value => (value ? undefined : "This field is required");

const renderField = ({
  input,
  label,
  type,
  placeholder,
  className,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={className}
      />
      {touched &&
        ((error && <span className="errorMsg">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderSelectField = ({
  input,
  label,
  type,
  children,
  meta: { touched, error }
}) => (
  <div>
    <label className="col-lg-10 control-label">{label}</label>
    <div className="col-lg-10">
      <select className="form-control" {...input}>
        {children}
      </select>
      {touched && error && <span className="errorMsg">{error}</span>}
    </div>
  </div>
);

class ChildForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  buildHouseOptions = () => {
    return this.props.houses.map((house, i) => (
      <HouseOption key={i} house={house} />
    ));
  };

  processSubmit = values => {
    console.log("in ChildForm >>> values ", values);
    let child = {
      lastname: values.lastname,
      firstname: values.firstname,
      dob: values.dob,
      house: values.house
    };

    if (this.props.match.params.id === "add") {
      this.props.childAction.addChild(child).then(() => {
        this.props.history.push("/child");
      });
    } else {
      console.log("update");
      this.props.childAction
        .updateChild(this.props.match.params.id, child)
        .then(() => {
          this.props.history.push("/child");
        });
    }
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>Child Information</b>
        </div>
        <form
          className="form-horizontal"
          onSubmit={this.props.handleSubmit(this.processSubmit)}
        >
          <fieldset>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="lastname"
                  component={renderField}
                  label="Last Name:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the last name"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="firstname"
                  component={renderField}
                  label="First Name:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the first name"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="dob"
                  component={renderField}
                  label="Date of Birth: (YYYY-MM-DD)"
                  type="text"
                  className="form-control"
                  placeholder="Enter the Date of Birth"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <Field
                name="house"
                component={renderSelectField}
                label="Select a house:"
                validate={[required]}
              >
                <option />
                {this.buildHouseOptions()}
              </Field>
            </div>
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-outline-info">
                  Submit
                </button>{" "}
                &nbsp;
                <div
                  onClick={() => this.props.history.goBack()}
                  className="btn btn-outline-info"
                >
                  Cancel
                </div>
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
    children: state.children,
    houses: state.houses,
    initialValues: props.location.state ? props.location.state.child : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    childAction: bindActionCreators(childAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "child" })(ChildForm)
);
