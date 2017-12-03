import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import Medicine from "./Medicine";
import * as medicineAction from "../actions/medicine";
class MedicineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  getAllMedicines() {
    return this.props.medicines.map(medicine => (
      <Medicine key={medicine._id} medicine={medicine} />
    ));
  }
  componentDidMount() {
    console.log("Component mounted");

    this.props.medicineAction
      .getPrescriptionForChild(this.props.match.params.id)
      .then(res => {
        this.setState({ loaded: true });
      });
  }

  render() {
    console.log(this.state);
    if (this.state.loaded) {
      if (this.props.medicines.length > 0) {
        return (
          <div className="container">
            <div className="row">
              <div className="col btn-add">
                <Link
                  className="btn btn-outline-info"
                  to={{
                    pathname: `/child/${this.props.match.params
                      .id}/medicine/add`
                  }}
                >
                  Add a New Medicine
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Reason</th>
                      <th>Physician Details</th>
                      <th>Schedule</th>
                      <th>Administration Times</th>
                      <th>Start Date</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{this.getAllMedicines()}</tbody>
                </table>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            No medicines added
            <div className="row">
              <div className="col btn-add">
                <Link
                  className="btn btn-outline-info"
                  to={{
                    pathname: `/child/${this.props.match.params
                      .id}/medicine/add`
                  }}
                >
                  Add a New Medicine
                </Link>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return "Loading";
    }
  }
}
function mapStateToProps(state, props) {
  console.log("Propsss", state);

  return {
    medicines: state.medicines
  };
}
function mapDispatchToProps(dispatch) {
  return {
    medicineAction: bindActionCreators(medicineAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicineList);
