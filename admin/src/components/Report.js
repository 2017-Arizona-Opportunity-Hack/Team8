import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as childAction from "../actions/child";
import moment from "moment";
import ChildOption from "./ChildOption";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

import config from "../config";

const API_URL = config.API_URL;
const FileDownload = require("react-file-download");

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
const renderDatePicker = ({
  input,
  placeholder,
  defaultValue,
  selectedDate,
  meta: { touched, error }
}) => (
  <div>
    <DatePicker
      {...input}
      dateForm="YYYY/MM/DD"
      selected={input.value ? moment(input.value) : null}
    />
    {touched && error && <span className="errorMsg">{error}</span>}
  </div>
);

class Report extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      customDate: false,
      file: true
    };
    this.showHideDateRange = this.showHideDateRange.bind(this);
  }
  showHideDateRange() {
    this.setState({ customDate: !this.state.customDate });
  }
  getMonthArray = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  };
  buildChildOptions = () => {
    return this.props.children.map((child, i) => (
      <ChildOption key={i} child={child} />
    ));
  };
  buildMonthOptions = () => {
    var monthArray = this.getMonthArray();
    return monthArray.map((month, i) => (
      <option key={i} value={i}>
        {month}
      </option>
    ));
  };

  processSubmit = values => {
    this.setState({ file: true });
    console.log("in report >>> values ", values);
    var child_id = JSON.parse(values.child)._id;
    var start_date_form = "";
    var end_date_form = "";
    if (!this.state.customDate) {
      var child_id = JSON.parse(values.child)._id;
      var month = values.month;
      month++;
      var start_date = 1;
      var end_date = 0;
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      )
        end_date = 31;
      else if (month == 2) end_date = 28;
      else {
        end_date = 30;
      }
      start_date_form = moment().year() + "-" + month + "-" + start_date;
      end_date_form = moment().year() + "-" + month + "-" + end_date;
    } else {
      var start = values.start_date.split("/");
      var end = values.end_date.split("/");
      start_date_form = start[2] + "-" + start[0] + "-" + start[1];
      end_date_form = end[2] + "-" + end[0] + "-" + end[1];
    }
    let formdata = new FormData();
    formdata.append("child_id", child_id);
    formdata.append("start_date", start_date_form);
    formdata.append("end_date", end_date_form);
    axios
      .post(`${API_URL}/getSchedule`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // window.open(response.data);
        if (response.data.success === 0) {
          console.log("Falseeee");
          this.setState({ file: false });
        } else {
          FileDownload(
            response.data,
            JSON.parse(values.child).firstname +
              "_" +
              JSON.parse(values.child).lastname +
              ".csv"
          );
        }
        console.log(response);
      });
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>Generate a report </b>
        </div>
        <form
          className="form-horizontal"
          onSubmit={this.props.handleSubmit(this.processSubmit)}
        >
          <fieldset>
            <div className="form-group">
              <Field
                name="child"
                component={renderSelectField}
                label="Select a child:"
                validate={[required]}
              >
                <option />
                {this.buildChildOptions()}
              </Field>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="daterange" className="col-lg-10 control-label">
                  Date Range:
                </label>
                <div className="col-lg-10 control-label">
                  Month
                  <Field
                    name="month"
                    id="month"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.customDate === false}
                    onChange={this.showHideDateRange}
                  />
                  Custom Date range
                  <Field
                    name="month"
                    id="month"
                    style={{ marginLeft: 10, marginRight: 20 }}
                    component="input"
                    type="radio"
                    checked={this.state.customDate === true}
                    onChange={this.showHideDateRange}
                  />
                </div>
              </div>
            </div>
            {!this.state.customDate && (
              <div className="form-group">
                <Field
                  name="month"
                  component={renderSelectField}
                  label="Select a Month:"
                  validate={[required]}
                >
                  <option />
                  {this.buildMonthOptions()}
                </Field>
              </div>
            )}
            {this.state.customDate && (
              <div className="form-group col-lg-10">
                Select Start Date
                <Field
                  name="start_date"
                  component={renderDatePicker}
                  label="Select a Start Date:"
                  validate={[required]}
                />
              </div>
            )}
            {this.state.customDate && (
              <div className="form-group col-lg-10">
                Select End Date
                <Field
                  name="end_date"
                  component={renderDatePicker}
                  label="Select an End Date:"
                  validate={[required]}
                />
              </div>
            )}
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
            {!this.state.file && (
              <span className="errorMsg col-lg-10">
                No Report exists for the selected dates
              </span>
            )}
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
  reduxForm({ form: "report" })(Report)
);
