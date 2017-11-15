import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as childAction from "../actions/child";

const Child = props => {
  return (
    <tr>
      <td>{props.child.lastname}</td>
      <td>{props.child.firstname}</td>
      <td>{props.child.age}</td>
      <td>
        <Link
          className="btn btn-outline-info"
          to={`/client/${props.child._id}`}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>{" "}
        &nbsp;
        <a
          className="btn btn-outline-danger"
          onClick={() =>
            props.childAction.deleteChild(props.child._id, props.child)}
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
    childAction: bindActionCreators(childAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Child);
