import React from 'react';

const HouseOption = (props) => {
  return (
    <option value={props.house._id}>{props.house.name}</option>
  );
}

export default HouseOption;
