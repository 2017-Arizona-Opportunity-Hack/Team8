import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as parentAction from '../actions/parent';

const Parent = (props) => {

  return (
    <tr>
      <td>
        <Link className="view-link" to={{
          pathname: `/parentDetail/${props.parent._id}`,
          state: { parent: props.parent }
        }}>{props.parent.lastname}</Link>
      </td>
      <td>{props.parent.firstname}</td>
      <td>{props.parent.phone}</td>
      <td>{props.parent.email}</td>
      <td>
        <Link className="btn btn-outline-info" to={`/parent/${props.parent._id}`}><i className="fa fa-pencil" aria-hidden="true"></i>
        </Link> &nbsp;
        <a className="btn btn-outline-danger" onClick={() => props.parentAction.deleteParent(props.parent._id, props.parent)} aria-label="Delete">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </a>
      </td>
    </tr>
  );

}

function mapDispatchToProps(dispatch) {
  return {
    parentAction: bindActionCreators(parentAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Parent)
