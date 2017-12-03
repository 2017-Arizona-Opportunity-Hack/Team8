import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as houseAction from "../actions/house";

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

class HouseForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  processSubmit = values => {
    console.log("in HouseForm >>> values ", values);
    let house = {
      name: values.name,
      address: values.address
    };
    if (this.props.match.params.id === "add") {
      this.props.houseAction.addHouse(house).then(() => {
        this.props.history.push("/house");
      });
    } else {
      console.log("update");
      this.props.houseAction
        .updateHouse(this.props.match.params.id, house)
        .then(() => {
          this.props.history.push("/house");
        });
    }
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>House Information</b>
        </div>
        <form
          className="form-horizontal"
          onSubmit={this.props.handleSubmit(this.processSubmit)}
        >
          <fieldset>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="name"
                  component={renderField}
                  label="House Name:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the House name"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10">
                <Field
                  name="address"
                  component={renderField}
                  label="Address:"
                  type="text"
                  className="form-control"
                  placeholder="Enter the House Address"
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

function mapStateToProps(state, props) {
  return {
    houses: state.houses,
    initialValues: props.location.state ? props.location.state.house : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    houseAction: bindActionCreators(houseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "house" })(HouseForm)
);
