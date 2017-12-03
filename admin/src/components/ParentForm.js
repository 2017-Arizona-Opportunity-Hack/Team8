import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, FieldArray, reduxForm, SubmissionError } from "redux-form";

import * as parentAction from "../actions/parent";
import * as selectedHousesAction from "../actions/selectedHouses";

import HouseOption from "./HouseOption";

const required = value => (value ? undefined : "This field is required");

const renderField = ({
  input,
  label,
  placeholder,
  className,
  type,
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
  <div className="control-label col-lg-10" style={{ marginTop: -20 }}>
    <label>{label}</label>
    <div>
      <select className="form-control" {...input}>
        {children}
      </select>
      {touched && error && <span className="errorMsg">{error}</span>}
    </div>
  </div>
);

const renderHouses = ({
  fields,
  meta: { touched, error },
  buildHouseOptions
}) => (
  <div>
    <Field
      name="house_select"
      component={renderSelectField}
      onChange={e => {
        try {
          fields.push(JSON.parse(e.target.value));
        } catch (err) {}
      }}
    >
      <option />
      {buildHouseOptions()}
    </Field>
    <br />
    <div className="col-lg-10" name="houses" style={{ marginTop: -10 }}>
      Selected houses:<br />
      {fields.map((house, index) => (
        <button
          type="button"
          key={index}
          className="btn btn-info btn-sm btn-house"
        >
          {fields.getAll()[index].name}
          <i
            className="fa fa-times-circle"
            aria-hidden="true"
            onClick={() => fields.remove(index)}
          />
        </button>
      ))}
    </div>
  </div>
);

class ParentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { houses: true };
  }
  buildHouseOptions = () => {
    return this.props.houses.map(house => (
      <HouseOption key={house._id} house={house} />
    ));
  };

  processSubmit = values => {
    if (values.houses) {
      if (values.houses.length > 0) {
        let parent = {
          lastname: values.lastname,
          firstname: values.firstname,
          phone: values.phone,
          email: values.email,
          password: values.password,
          houses: values.houses
        };
        if (this.props.match.params.id === "add") {
          this.props.parentAction.addParent(parent).then(() => {
            this.props.history.push("/parent");
          });
        } else {
          this.props.parentAction
            .updateParent(this.props.match.params.id, parent)
            .then(() => {
              this.props.history.push("/parent");
            });
        }
      } else {
        this.setState({ houses: false });
      }
    } else {
      this.setState({ houses: false });
    }
  };

  render() {
    console.log("PArent form state", this.state);

    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>Parent Information</b>
        </div>
        <form
          className="form-horizontal"
          onSubmit={this.props.handleSubmit(this.processSubmit)}
        >
          <fieldset>
            <div className="form-group">
              <label className="col-lg-10 control-label">Select a house:</label>
              <div className="col-lg-offset-2">
                <FieldArray
                  name="houses"
                  component={renderHouses}
                  buildHouseOptions={this.buildHouseOptions}
                />
              </div>
              {!this.state.houses && (
                <span className="errorMsg col-lg-10">
                  Select at least one house
                </span>
              )}
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="lastname"
                  type="text"
                  component={renderField}
                  label="Last Name:"
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
                  name="phone"
                  component={renderField}
                  label="Phone Number:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the phone"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="email"
                  component={renderField}
                  label="Email Address:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the email"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="password"
                  component={renderField}
                  label="Password:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the password"
                  validate={[required]}
                />
              </div>
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

function mapStateToprops(state, props) {
  return {
    children: state.children,
    parents: state.parents,
    houses: state.houses,
    initialValues: props.location.state ? props.location.state.parent : null
  };
}

function mapDispatchToprops(dispatch) {
  return {
    parentAction: bindActionCreators(parentAction, dispatch),
    selectedHousesAction: bindActionCreators(selectedHousesAction, dispatch)
  };
}

export default connect(mapStateToprops, mapDispatchToprops)(
  reduxForm({ form: "parent" })(ParentForm)
);
