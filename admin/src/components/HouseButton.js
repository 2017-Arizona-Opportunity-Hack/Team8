import React from 'react';

const HouseButton = (props) => {
  console.log('in HouseButton >>> props ', props);
  return <button type="button" className="btn btn-info btn-sm btn-house">{props.house.name} <i className="fa fa-times-circle" aria-hidden="true"></i></button>
}

export default HouseButton;
