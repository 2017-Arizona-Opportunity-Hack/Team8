import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HouseList extends Component {

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col btn-add">
            <Link className="btn btn-outline-info" to={`/house/add`}>
              Add a New House
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
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

export default HouseList;
