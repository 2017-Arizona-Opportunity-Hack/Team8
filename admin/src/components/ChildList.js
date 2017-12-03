import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Child from "./Child";

class ChildList extends Component {
  getChildren() {
    return this.props.children.map(child => (
      <Child key={child._id} child={child} />
    ));
  }

  render() {
    console.log("in ChildList >>> ", this.props);
    console.log("localStorage", localStorage.getItem("user"));

    if (this.props.children) {
      return (
        <div className="container">
          <div className="row">
            <div className="col btn-add">
              <Link className="btn btn-outline-info" to={`/child/add`}>
                Add a New Child
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>House</th>
                    <th>Date of Birth</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{this.getChildren()}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      <div className="container">
        No Children Added
        <div className="row">
          <div className="col btn-add">
            <Link className="btn btn-outline-info" to={`/child/add`}>
              Add a New Child
            </Link>
          </div>
        </div>
      </div>;
    }
  }
}
function mapStateToProps(state, props) {
  return {
    children: state.children
  };
}

export default connect(mapStateToProps, null)(ChildList);
