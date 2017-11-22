import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, FieldArray, reduxForm } from "redux-form";

import * as medicineAction from "../actions/medicine";

class MedicineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      scheduled: false,
      everyday: true,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      morning: false,
      afternoon: false,
      evening: false,
      night: false
    };

    this.showHideScheduled = this.showHideScheduled.bind(this);
    this.showHideEveryday = this.showHideEveryday.bind(this);
    this.updateDayCheckbox = this.updateDayCheckbox.bind(this);
    this.updateTimeCheckbox = this.updateTimeCheckbox.bind(this);
  }
  componentDidMount() {
    if (this.props != null) {
      this.setState(this.props.initialValues);
    }
  }
  showHideScheduled() {
    this.setState({ scheduled: !this.state.scheduled });
  }
  showHideEveryday() {
    this.setState({ everyday: !this.state.everyday });
  }
  updateDayCheckbox(e) {
    var day = e.target.name;
    if (day === "mon") this.setState({ mon: !this.state.mon });
    else if (day === "tue") this.setState({ tue: !this.state.tue });
    else if (day === "wed") this.setState({ wed: !this.state.wed });
    else if (day === "thu") this.setState({ thu: !this.state.thu });
    else if (day === "fri") this.setState({ fri: !this.state.fri });
    else if (day === "sat") this.setState({ sat: !this.state.sat });
    else this.setState({ sun: !this.state.sun });
    // this.setState({ everyday: !this.state.everyday });
  }
  updateTimeCheckbox(e) {
    var time = e.target.name;
    if (time === "morning") this.setState({ morning: !this.state.morning });
    else if (time === "afternoon")
      this.setState({ afternoon: !this.state.afternoon });
    else if (time === "evening")
      this.setState({ evening: !this.state.evening });
    else this.setState({ night: !this.state.night });
  }

  processSubmit = values => {
    var listTimes = [];
    var listDays = [];
    let medicine = {};

    if (this.state.scheduled) {
      if (this.state.morning) {
        listTimes.push("Morning");
      }
      if (this.state.afternoon) {
        listTimes.push("Afternoon");
      }
      if (this.state.evening) {
        listTimes.push("Evening");
      }
      if (this.state.night) {
        listTimes.push("Night");
      }
      listTimes = listTimes.join(",");

      if (this.state.everyday) listDays = ["1", "2", "3", "4", "5", "6", "7"];
      else {
        if (this.state.mon) listDays.push("1");
        if (this.state.tue) listDays.push("2");
        if (this.state.wed) listDays.push("3");
        if (this.state.thu) listDays.push("4");
        if (this.state.fri) listDays.push("5");
        if (this.state.sat) listDays.push("6");
        if (this.state.sun) listDays.push("7");
      }
      listDays = listDays.join(",");
      medicine = {
        medicine_name: values.medicine_name,
        reason: values.reason,
        special_instructions: values.special_instructions,
        prescribed_date: values.prescribed_date,
        physician_name: values.physician_name,
        physician_phone: values.physician_phone,
        days_of_week: listDays,
        dosage: values.dosage,
        child_id: this.props.match.params.id,
        administration_time: listTimes,
        scheduled: "True",
        total_no_of_days: values.total_no_of_days,
        start_date: values.start_date
      };
    } else {
      medicine = {
        medicine_name: values.medicine_name,
        reason: values.reason,
        special_instructions: values.special_instructions,
        prescribed_date: values.prescribed_date,
        physician_name: values.physician_name,
        physician_phone: values.physician_phone,
        dosage: values.dosage,
        child_id: this.props.match.params.id,
        scheduled: "False"
      };
    }
    console.log("in processSubmit >>> parent", medicine);
    if (this.props.location.pathname.indexOf("update") != -1) {
      console.log("Formva medicinal", "update");
      this.props.medicineAction
        .updateMedicine(this.props.initialValues._id, medicine)
        .then(() => {
          this.props.history.push(
            `/child/${this.props.match.params.id}/medicines`
          );
        });
    } else {
      this.props.medicineAction.addMedicine(medicine).then(() => {
        this.props.history.push(
          `/child/${this.props.match.params.id}/medicines`
        );
      });

      console.log("Formva medicinal", "add");
    }
    // this.props.medicineAction.addMedicine(medicine).then(() => {
    //   // props.history.push("/medicine");
    //   console.log("Medicine Added");
    // });
    //
    /*
    if (props.match.params.id === "add") {
      console.log("add");
      props.medicineAction.addMedicine(medicine).then(() => {
        // props.history.push("/medicine");
      });
    } else {
      console.log("update");
      props.parentAction
        .updateMedicine(props.match.params.id, medicine)
        .then(() => {
          props.history.push("/medicine");
        });
    }
    */
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>Medicine Information</b>
        </div>
        <form
          className="form-horizontal"
          onSubmit={this.props.handleSubmit(this.processSubmit)}
        >
          <fieldset>
            <div className="form-group">
              <label
                htmlFor="medicine_name"
                className="col-lg-10 control-label"
              >
                Medicine Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="medicine_name"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter name of the medicine"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reason" className="col-lg-10 control-label">
                Reason:
              </label>
              <div className="col-lg-10">
                <Field
                  name="reason"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter reason for medication"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="special_instructions"
                className="col-lg-10 control-label"
              >
                Special Instructions:
              </label>
              <div className="col-lg-10">
                <Field
                  name="special_instructions"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter Special Instructions"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="prescribed_date"
                className="col-lg-10 control-label"
              >
                Presribed Date (YYYY-MM-DD):
              </label>
              <div className="col-lg-10">
                <Field
                  name="prescribed_date"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Enter date of prescription"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="physician_name"
                className="col-lg-10 control-label"
              >
                Physician Name:
              </label>
              <div className="col-lg-10">
                <Field
                  name="physician_name"
                  component="input"
                  type="text"
                  placeholder="Enter name of the presribing Physician"
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="physician_phone"
                className="col-lg-10 control-label"
              >
                Physician Phone:
              </label>
              <div className="col-lg-10">
                <Field
                  name="physician_phone"
                  component="input"
                  type="text"
                  placeholder="Enter contact of presribing Physician"
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Dosage" className="col-lg-10 control-label">
                Dosage:
              </label>
              <div className="col-lg-10">
                <Field
                  name="dosage"
                  component="input"
                  type="text"
                  placeholder="Enter Dosage"
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="scheduled" className="col-lg-10 control-label">
                  Scheduled Medicine
                </label>
                <div className="col-lg-10 control-label">
                  Yes
                  <Field
                    name="scheduled"
                    id="scheduled"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.scheduled === true}
                    onChange={this.showHideScheduled}
                  />
                  No
                  <Field
                    name="scheduled"
                    id="scheduled"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.scheduled === false}
                    onChange={this.showHideScheduled}
                  />
                </div>
              </div>
            </div>

            {this.state.scheduled && (
              <div className="form-group">
                <label
                  htmlFor="days_of_week"
                  className="col-lg-10 control-label"
                >
                  Days of the Week:
                </label>
                <div className="col-lg-10 control-label">
                  Everyday
                  <Field
                    name="everyday"
                    id="everyday"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.everyday === true}
                    onChange={this.showHideEveryday}
                  />
                  Specific Days
                  <Field
                    name="everyday"
                    id="everyday"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.everyday === false}
                    onChange={this.showHideEveryday}
                  />
                </div>
              </div>
            )}
            {!this.state.everyday &&
              this.state.scheduled && (
                <div className="form-group col-lg-10">
                  <label htmlFor="employed">Select Days: </label>
                  <div>
                    Monday
                    <Field
                      name="mon"
                      id="mon"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Tuesday
                    <Field
                      name="tue"
                      id="tue"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Wednesday
                    <Field
                      name="wed"
                      id="wed"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Thursday
                    <Field
                      name="thu"
                      id="thu"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Friday
                    <Field
                      name="fri"
                      id="fri"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Saturday
                    <Field
                      name="sat"
                      id="sat"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                    Sunday
                    <Field
                      name="sun"
                      id="sun"
                      style={{ marginLeft: 10, marginRight: 20 }}
                      component="input"
                      type="checkbox"
                      onChange={e => this.updateDayCheckbox(e)}
                    />
                  </div>
                </div>
              )}
            {this.state.scheduled && (
              <div className="form-group">
                <label
                  htmlFor="administration_time"
                  className="col-lg-10 control-label"
                >
                  Administration time:
                </label>
                <div className="col-lg-10">
                  Morning
                  <Field
                    name="morning"
                    id="morning"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="checkbox"
                    onChange={e => this.updateTimeCheckbox(e)}
                  />
                  Afternoon
                  <Field
                    name="afternoon"
                    id="afternoon"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="checkbox"
                    onChange={e => this.updateTimeCheckbox(e)}
                  />
                  Evening
                  <Field
                    name="evening"
                    id="evening"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="checkbox"
                    onChange={e => this.updateTimeCheckbox(e)}
                  />
                  Night
                  <Field
                    name="night"
                    id="night"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="checkbox"
                    onChange={e => this.updateTimeCheckbox(e)}
                  />
                </div>
              </div>
            )}
            {this.state.scheduled && (
              <div className="form-group">
                <label
                  htmlFor="total_no_of_days"
                  className="col-lg-10 control-label"
                >
                  Total Number of days:
                </label>
                <div className="col-lg-10">
                  <Field
                    name="total_no_of_days"
                    component="input"
                    type="text"
                    placeholder="Enter number of days the medicine is to be administered"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>
            )}
            {this.state.scheduled && (
              <div className="form-group">
                <label htmlFor="start_date" className="col-lg-10 control-label">
                  Start Date (YYYY-MM-DD):
                </label>
                <div className="col-lg-10">
                  <Field
                    name="start_date"
                    component="input"
                    type="text"
                    placeholder="Enter starting date to begin medicine adminstration"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-outline-info">
                  Submit
                </button>{" "}
                &nbsp;
                <Link
                  to={{
                    pathname: `/child/${this.props.match.params.id}/medicines`
                  }}
                  className="btn btn-outline-info"
                >
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
/*function generateInitialHouses(props, state) {
  if (state.selectedHouses.length === 0) {
    console.log("State");
    if (props.location.state) {
      console.log("boolean");
      var parent = props.location.state.parent;

      var house_id = parent["house_id"];
      var houses = [];
      for (var i = 0; i < house_id.length; i++) {
        var id = house_id[i];
        for (var j = 0; j < state.houses.length; j++) {
          if (state.houses[j]["_id"] === id) {
            houses.push(state.houses[j]);
          }
        }
      }
      state.selectedHouses = houses;
      return state.selectedHouses;
    } else {
      // state.selectedHouses = [];
      return state.selectedHouses;
    }
  } else {
    if (props.match.params.id === "add") {
      state.selectedHouses = [];
    }
    return state.selectedHouses;
  }
}
*/
function generateInitalValues(medicine) {
  let obj = {};
  obj["_id"] = medicine._id;
  obj["medicine_name"] = medicine.medicine_name;
  obj["reason"] = medicine.reason;
  obj["special_instructions"] = medicine.special_instructions;
  obj["physician_name"] = medicine.physician_name;
  obj["physician_phone"] = medicine.physician_phone;
  obj["dosage"] = medicine.dosage;
  obj["prescribed_date"] = medicine.prescribed_date;
  if (medicine.scheduled === "False") {
    obj["scheduled"] = false;
  } else {
    obj["scheduled"] = true;
    var listDays = medicine.days_of_week;
    var alldays = [1, 2, 3, 4, 5, 6, 7];

    if (listDays === alldays) obj["everyday"] = true;
    else {
      obj["everyday"] = false;
      if (listDays.indexOf(1) != -1) obj["mon"] = true;
      if (listDays.indexOf(2) != -1) obj["tue"] = true;
      if (listDays.indexOf(3) != -1) obj["wed"] = true;
      if (listDays.indexOf(4) != -1) obj["thu"] = true;
      if (listDays.indexOf(5) != -1) obj["fri"] = true;
      if (listDays.indexOf(6) != -1) obj["sat"] = true;
      if (listDays.indexOf(7) != -1) obj["sun"] = true;
    }
    var listTimes = medicine.administration_time;
    if (listTimes.indexOf("Morning") != -1) obj["morning"] = true;
    if (listTimes.indexOf("Afternoon") != -1) obj["afternoon"] = true;
    if (listTimes.indexOf("Evening") != -1) obj["evening"] = true;
    if (listTimes.indexOf("Night") != -1) obj["night"] = true;

    obj["start_date"] = medicine.start_date;
    obj["total_no_of_days"] = medicine.total_no_of_days;
  }
  return obj;
}
function mapStateToProps(state, props) {
  return {
    children: state.children,
    parents: state.parents,
    houses: state.houses,
    // initialValues: generateInitalValues(state,props)
    initialValues: props.location.state
      ? generateInitalValues(props.location.state.medicine)
      : null
    // initialValues: { scheduled: true }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    medicineAction: bindActionCreators(medicineAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "medicine" })(MedicineForm)
);
