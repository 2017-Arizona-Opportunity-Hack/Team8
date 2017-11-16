import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import House from "./House";

class HouseList extends Component {
  getHouses() {
    return this.props.houses.map(house => (
      <House key={house._id} house={house} />
    ));
  }

  render() {
    console.log("in HouseList >>> ", this.props);

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
                  <th>House name</th>
                  <th>Address</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.getHouses()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    houses: state.houses
  };
}

export default connect(mapStateToProps, null)(HouseList);
