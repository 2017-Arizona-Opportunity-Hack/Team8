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
            medicine_name: values.medicine_name,
            reason: values.reason,
            special_instructions: values.special_instructions,
            prescribed_date: values.prescribed_date,
            Physician_name: values.Physician_name,
            Physician_phone: values.Physician_phone,
            days_of_week: values.days_of_week,
            Child_id: values.Child_id,
            Dosage : values.Dosage,
            administration_time: values.administration_time,
            scheduled : values.scheduled,
            total_no_of_days : values.total_no_of_days,
            Start_date: values.Start_date
        };
        // console.log("in processSubmit >>> parent", parent);
        //
        if (props.match.params.id === "add") {
            console.log("add");
            props.parentAction.addMedicine(medicine).then(() => {
                props.history.push("/medicine");
            });
        } else {
            console.log("update");
            props.parentAction
                .updateMedicine(props.match.params.id, medicine)
                .then(() => {
                    props.history.push("/medicine");
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
                        <label htmlFor="medicine_name" className="col-lg-2 control-label">
                            Medicine Name:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="medicine_name"
                                component="input"
                                type="text"
                                className="form-control"
                                placeholder="medicine name"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason" className="col-lg-2 control-label">
                            Reason:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="reason"
                                component="input"
                                type="text"
                                className="form-control"
                                placeholder="reason"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="special_instructions" className="col-lg-2 control-label">
                            special_instructions:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="special_instructions"
                                component="input"
                                type="text"
                                className="form-control"
                                placeholder="Enter special instructions"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="prescribed_date" className="col-lg-2 control-label">
                            prescribed date:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="prescribed_date"
                                component="input"
                                type="text"
                                className="form-control"
                                placeholder="Enter prescribed date"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Physician_name" className="col-lg-2 control-label">
                            Physician name:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="Physician_name"
                                component="input"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Physician_phone" className="col-lg-2 control-label">
                            Physician phone:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="Physician_phone"
                                component="input"
                                type="text"
                                placeholder="Physician_phone"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="days_of_week" className="col-lg-2 control-label">
                            days_of_week:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="days_of_week"
                                component="input"
                                type="text"
                                placeholder="1 for Monday, 2 for Tuesday etc"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Child_id" className="col-lg-2 control-label">
                            Child id:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="Child_id"
                                component="input"
                                type="text"
                                className="form-control"
                                placeholder="Child_id"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Dosage" className="col-lg-2 control-label">
                            Dosage:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="Dosage"
                                component="input"
                                type="text"
                                placeholder="Dosage"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="administration_time" className="col-lg-2 control-label">
                            Administration time:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="administration_time"
                                component="input"
                                type="text"
                                placeholder="morning, evening or night"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="scheduled" className="col-lg-2 control-label">
                            scheduled:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="scheduled"
                                component="input"
                                type="text"
                                plaeholder="true or false"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total_no_of_days" className="col-lg-2 control-label">
                            total no of days:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="total no of days"
                                component="input"
                                type="text"
                                placeholder="number of days the medicine is to be administered"
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Start_date" className="col-lg-2 control-label">
                            Start_date:
                        </label>
                        <div className="col-lg-10">
                            <Field
                                name="Start_date"
                                component="input"
                                type="text"
                                placeholder="YYYY:MM:DD"
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
