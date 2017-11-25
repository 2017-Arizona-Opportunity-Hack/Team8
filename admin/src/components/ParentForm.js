import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, FieldArray, reduxForm, SubmissionError } from "redux-form";

import * as parentAction from "../actions/parent";
import * as selectedHousesAction from "../actions/selectedHouses";

import HouseOption from "./HouseOption";

const required = value => value ? undefined : 'This field is required';

// const houseRequired = houses => houses.length > 0 ? undefined : 'You must select a house from the list';

const houseRequired = (houses) => {
  console.log('in houseRequired >>> houses', houses);
  if (houses.length > 0) {
    console.log('validation success');
    return undefined;
  } else {
    console.log('validation failed');
    return 'You must select a house from the list';
  }
}

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
      <input {...input} placeholder={placeholder} type={type} className={className} />
      {touched && ((error && <span className="errorMsg">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderSelectField = ({
  input,
  label,
  type,
  children,
  meta: { touched, error }
}) => (
  <div>
    <select className="form-control" {...input}>
      {children}
    </select>
    {touched && error && <span className="errorMsg">{error}</span>}
  </div>
)

const renderHouses = ({
  fields,
  meta: { touched, error },
  buildHouseOptions
}) => (
  <div>
    <Field
      name="house_select"
      component={renderSelectField}
      onChange={e => fields.push(JSON.parse(e.target.value))}
      className="form-control"
    >
      <option />
      {buildHouseOptions()}
    </Field>
    {touched && error && <span className="errorMsg">{error}</span>}
    <br />
    <div className="form-group" name="houses">
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

const ParentForm = props => {

  const buildHouseOptions = () => {
    return props.houses.map(house => (
      <HouseOption key={house._id} house={house} />
    ));
  };

  const processSubmit = values => {
    let parent = {
      lastname: values.lastname,
      firstname: values.firstname,
      phone: values.phone,
      email: values.email,
      password: values.password,
      houses: values.houses
    };
    if (props.match.params.id === "add") {
      props.parentAction.addParent(parent).then(() => {
        props.history.push("/parent");
      });
    } else {
      props.parentAction
        .updateParent(props.match.params.id, parent)
        .then(() => {
          props.history.push("/parent");
        });
    }
  };

  return (
    <div className="container">
      <br />
      <div className="alert alert-secondary" role="alert">
        <b>Parent Information</b>
      </div>
      <form
        className="form-horizontal"
        onSubmit={props.handleSubmit(processSubmit)}
      >
        <fieldset>
          <div className="form-group">
            <label className="col-lg-2 control-label">Select a house:</label>
            <div className="col-lg-10">
              <FieldArray
                name="houses"
                component={renderHouses}
                buildHouseOptions={buildHouseOptions}
                validate={[ houseRequired ]}
              />
            </div>
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
                validate={[ required ]}
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
                validate={[ required ]}
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
                validate={[ required ]}
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
                validate={[ required ]}
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
                validate={[ required ]}
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
};

function mapStateToProps(state, props) {
  return {
    children: state.children,
    parents: state.parents,
    houses: state.houses,
    initialValues: props.location.state ? props.location.state.parent : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    parentAction: bindActionCreators(parentAction, dispatch),
    selectedHousesAction: bindActionCreators(selectedHousesAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "parent" })(ParentForm)
);
