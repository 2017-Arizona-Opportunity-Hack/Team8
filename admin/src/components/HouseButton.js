import React from "react";
import * as selectedHousesAction from "../actions/selectedHouses";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const HouseButton = props => {
  console.log("in HouseButton >>> props ", props);
  const clicker = () => {
    console.log("Hello");
    props.selectedHousesAction.deleteSelectedHouse(props.house);
  };
  return (
    <button type="button" className="btn btn-info btn-sm btn-house">
      {props.house.name}{" "}
      <i className="fa fa-times-circle" aria-hidden="true" onClick={clicker} />
    </button>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    selectedHousesAction: bindActionCreators(selectedHousesAction, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(HouseButton);
