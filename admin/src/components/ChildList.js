import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Child from './Child';

class ChildList extends Component {

  render() {
    console.log('in ChildList >>> ', this.props);

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
                    <th>House</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
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

export default ChildList;
