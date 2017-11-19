import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, FieldArray, reduxForm } from "redux-form";

import * as parentAction from "../actions/parent";
import * as selectedHousesAction from "../actions/selectedHouses";

import HouseOption from "./HouseOption";
import HouseButton from "./HouseButton";

const renderHouses = ({
  fields,
  meta: { touched, error },
  buildHouseOptions
}) => (
  <div>
    <Field
      name="house_select"
      component="select"
      onChange={e => fields.push(JSON.parse(e.target.value))}
      className="form-control"
    >
      <option />
      {buildHouseOptions()}
    </Field>
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
  console.log("in ParentForm >>> props ", props);

  const array = [];

  const buildHouseOptions = () => {
    return props.houses.map(house => (
      <HouseOption key={house._id} house={house} />
    ));
  };

  const buildHouseButtons = values => {
    console.log("in buildHouseButtons >>> selectedHouses ", props);
    console.log("in buildHousesButton house select");

    if (props.initialValues) {
      return props.initialValues.houses.map((house, i) => (
        <HouseButton
          key={i}
          house={house}
          selectedHousesAction={selectedHousesAction}
        />
      ));
    } else return;
  };

  const handleChange = e => {
    console.log("in handleChange >>> value=", e.target.value);
    var house = JSON.parse(e.target.value);
    array.push(house);
    // props.initialValues.houses.push(house);
  };

  const processSubmit = values => {
    console.log("Extreme Values", values);
    // console.log('in processSubmit >>> props', props);
    // let houseIds = [];
    // props.selectedHouses.forEach(house =>
    //   houseIds.push({ _id: house._id, name: house.name })
    // );
    let parent = {
      lastname: values.lastname,
      firstname: values.firstname,
      phone: values.phone,
      email: values.email,
      password: values.password,
      houses: values.houses
    };
    // console.log("in processSubmit >>> parent", parent);
    //
    if (props.match.params.id === "add") {
      console.log("add");
      props.parentAction.addParent(parent).then(() => {
        props.history.push("/parent");
      });
    } else {
      console.log("update");
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
              />
            </div>
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
};
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
