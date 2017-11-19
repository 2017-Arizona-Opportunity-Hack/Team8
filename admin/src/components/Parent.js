import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as parentAction from "../actions/parent";

const Parent = props => {
  const generateHousesString = () => {
    var string = "";
    string = props.parent.houses[0].name;
    for (var i = 1; i < props.parent.houses.length; i++) {
      string = string + ", " + props.parent.houses[i].name;
    }
    return string;
  };
  return (
    <tr>
      <td>{props.parent.lastname}</td>
      <td>{props.parent.firstname}</td>
      <td>{props.parent.phone}</td>
      <td>{props.parent.email}</td>
      <td>{generateHousesString()}</td>
      <td>
        <Link
          className="btn btn-outline-info"
          to={{
            pathname: `/parent/${props.parent._id}`,
            state: { parent: props.parent }
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>&nbsp;
        <a
          className="btn btn-outline-danger"
          onClick={() =>
            props.parentAction.deleteParent(props.parent._id, props.parent)}
          aria-label="Delete"
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </a>
      </td>
    </tr>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    parentAction: bindActionCreators(parentAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Parent);
