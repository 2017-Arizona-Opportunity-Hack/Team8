import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import * as parentAction from "../actions/parent";
import * as selectedHousesAction from '../actions/selectedHouses';

import HouseOption from "./HouseOption";

const handleChange = (e) => {
  console.log('in handleChange >>> value=', e.target.value);
  let value = JSON.parse(e.target.value);
  this.props.selectedHousesAction.getSelectedHouse(value);
}

class ParentForm extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     houses: []
  //   };
  // }

  buildHouseOptions() {
    return this.props.houses.map(house => (
      <HouseOption key={house._id} house={house} />
    ));
  }

  processSubmit(values) {
    // console.log("in ParentForm >>> values ", values);
    let parent = {
      lastname: values.lastname,
      firstname: values.firstname,
      phone: values.phone,
      email: values.email,
      password: values.password
      // houses: values.houses
    };

    if (this.props.match.params.id === "add") {
      this.props.parentAction.addParent(parent).then(() => {
        this.props.history.push("/parent");
      });
    } else {
      console.log("update");
      // this.props.parentAction.updateParent(parseInt(this.props.match.params.id, 10), parent).then(() => {
      //   this.setState({ redirect: true });
      // });
    }
  };

  render() {
    console.log("in ParentForm >>> props ", this.props);
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
              <label className="col-lg-2 control-label">Select a house:</label>
              <div className="col-lg-10">
                <Field
                  name="house"
                  component="select"
                  onChange={handleChange}
                  className="form-control">
                  <option />
                  {this.buildHouseOptions()}
                </Field>
              </div>
            </div>
            <div className="form-group">
              <label className="col control-label">
                Selected house:
              </label>
            </div>
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
              <label htmlFor="phone" className="col-lg-2 control-label">
                Phone:
              </label>
              <div className="col-lg-10">
                <Field
                  name="phone"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the phone"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="col-lg-2 control-label">
                Email:
              </label>
              <div className="col-lg-10">
                <Field
                  name="email"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the email"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="col-lg-2 control-label">
                Password:
              </label>
              <div className="col-lg-10">
                <Field
                  name="password"
                  component="input"
                  type="text"
                  className="form-control"
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
                <Link to="/parent" className="btn btn-outline-info">
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
    children: state.children,
    houses: state.houses,
    selectedHouses: state.selectedHouses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    parentAction: bindActionCreators(parentAction, dispatch),
    selectedHousesAction: bindActionCreators(selectedHousesAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "client" })(ParentForm)
);
