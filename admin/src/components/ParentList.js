import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ParentList extends Component {

  render() {
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
                  <th></th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

}

export default ParentList;
