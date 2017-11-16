import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as houseAction from "../actions/house";

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
      house_name: values.house_name,
      address: values.address
    };
    if (this.props.match.params.id === "add") {
      this.props.houseAction.addHouse(house).then(() => {
        this.props.history.push("/house");
      });
    } else {
      console.log("update");
      // this.props.parentAction.updateParent(parseInt(this.props.match.params.id, 10), parent).then(() => {
      //   this.setState({ redirect: true });
      // });
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
              <label htmlFor="house_name" className="col-lg-2 control-label">
                House Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="house_name"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the House name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="col-lg-2 control-label">
                First Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="address"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter the House Address"
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

function mapStateToProps(state, props) {
  return {
    houses: state.houses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    houseAction: bindActionCreators(houseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "client" })(HouseForm)
);
