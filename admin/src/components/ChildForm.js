import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as childAction from "../actions/child";

import HouseOption from "./HouseOption";

class ChildForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  buildHouseOptions = () => {
    return this.props.houses.map(house => (
      <HouseOption key={house._id} house={house} />
    ));
  };
  // <option value={val}>{props.house.name}</option>
  // buildHouseOptions = () => {
  //   return this.props.houses.map(house => (
  //     <option key={house._id} val={JSON.stringify(house)}>
  //       {house.name}
  //     </option>
  //   ));
  // };
  processSubmit = values => {
    console.log("in ChildForm >>> values ", values);
    let child = {
      lastname: values.lastname,
      firstname: values.firstname,
      age: values.age,
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
              <label htmlFor="lastname" className="col-lg-2 control-label">
                Last Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="lastname"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the last name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="col-lg-2 control-label">
                First Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="firstname"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the first name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="age" className="col-lg-2 control-label">
                Age:
              </label>
              <div className="col-lg-10">
                <Field
                  name="age"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the Age"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="col-lg-2 control-label">
                  Select a house:
                </label>
                <div className="col-lg-10">
                  <Field
                    name="house"
                    component="select"
                    className="form-control"
                  >
                    <option />
                    {console.log("suke", this.props)}
                    {this.buildHouseOptions()}
                  </Field>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-outline-info">
                  Submit
                </button>{" "}
                &nbsp;
                <Link to="/" className="btn btn-outline-info">
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
function getInitialValues(state, props) {
  var initial = props.location.state.child;
  console.log("initial", initial.house);
  let d = initial.house;
  initial["housetest"] = 1;
  initial["house"] = d;
  return initial;
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
