import React from "react";

const ChildOption = props => {
  let val = JSON.stringify(props.child);
  return (
    <option value={val}>
      {props.child.firstname + " " + props.child.lastname}
    </option>
  );
};

export default ChildOption;
