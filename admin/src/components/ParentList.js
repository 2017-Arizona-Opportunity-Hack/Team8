import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Parent from "./Parent";

class ParentList extends Component {
  getParents() {
    return this.props.parents.map(parent => (
      <Parent key={parent._id} parent={parent} />
    ));
  }

  render() {
    // console.log('in ParentList >>> ', this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col btn-add">
            <Link className="btn btn-outline-info" to={`/parent/add`}>
              Add a New Parent
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Houses</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.getParents()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    parents: state.parents
  };
}

export default connect(mapStateToProps, null)(ParentList);
