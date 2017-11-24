import React from "react";
import { Link } from "react-router-dom";

const ParentDetail = props => {
  let {
    firstname,
    lastname,
    email,
    houses,
    phone
  } = props.location.state.parent;
  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-header">
          <strong>
            {`${props.location.state.parent.firstname} ${props.location.state
              .parent.lastname}`}
          </strong>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Houses: {houses}</li>
          <li className="list-group-item">First name: {firstname}</li>
          <li className="list-group-item">Last name: {lastname}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      </div>
      <br />
      <Link to="/parent" className="btn btn-outline-info">
        Cancel
      </Link>
    </div>
  );
};

export default ParentDetail;
