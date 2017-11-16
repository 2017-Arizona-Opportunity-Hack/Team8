import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as houseAction from "../actions/house";

const House = props => {
  return (
    <tr>
      <td>{props.house.name}</td>
      <td>{props.house.address}</td>
      <td>
        <Link
          className="btn btn-outline-info"
          to={`/client/${props.house._id}`}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>{" "}
        &nbsp;
        <a
          className="btn btn-outline-danger"
          onClick={() =>
            props.houseAction.deleteHouse(props.house._id, props.house)}
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
    houseAction: bindActionCreators(houseAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(House);
