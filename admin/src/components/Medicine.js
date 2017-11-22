import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as medicineAction from "../actions/medicine";

const Medicine = props => {
  const generateSchedule = () => {
    var scheduled = props.medicine.scheduled;

    if (scheduled === "False") return "As needed";
    else {
      var list = props.medicine.days_of_week;
      var timeList = [];
      if (list.indexOf(1) != -1) timeList.push("Mon");
      if (list.indexOf(2) != -1) timeList.push("Tue");
      if (list.indexOf(3) != -1) timeList.push("Wed");
      if (list.indexOf(4) != -1) timeList.push("Thu");
      if (list.indexOf(5) != -1) timeList.push("Fri");
      if (list.indexOf(6) != -1) timeList.push("Sat");
      if (list.indexOf(1) != -1) timeList.push("Sun");

      return timeList.join(" , ");
    }
  };
  const generateTimes = () => {
    var scheduled = props.medicine.scheduled;

    if (scheduled === "False") return " N/A ";
    else {
      var list = props.medicine.administration_time;
      var timeList = [];
      if (list.indexOf("Morning") != -1) timeList.push("Morning");
      if (list.indexOf("Afternoon") != -1) timeList.push("Afternoon");
      if (list.indexOf("Evening") != -1) timeList.push("Evening");
      if (list.indexOf("Night") != -1) timeList.push("Night");

      return timeList.join(" , ");
    }
  };
  return (
    <tr>
      <td className="table-row">{props.medicine.medicine_name}</td>
      <td className="table-row">{props.medicine.reason}</td>
      <td className="table-row">
        {props.medicine.physician_name + " , " + props.medicine.physician_phone}
      </td>
      <td className="table-row">{generateSchedule()}</td>
      <td className="table-row">{generateTimes()}</td>
      <td className="table-row">{props.medicine.start_date}</td>
      <td>
        <Link
          className="btn btn-outline-info"
          to={{
            pathname: `/child/${props.medicine.child_id}/medicine/update`,
            state: { medicine: props.medicine, child: props.child }
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>&nbsp;
        <a
          className="btn btn-outline-danger"
          onClick={() =>
            props.medicineAction.deleteMedicine(
              props.medicine._id,
              props.medicine
            )}
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
    medicineAction: bindActionCreators(medicineAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Medicine);
