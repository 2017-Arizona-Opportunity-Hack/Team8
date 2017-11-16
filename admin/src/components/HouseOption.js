import React from 'react';

const HouseOption = (props) => {
  let val = JSON.stringify(props.house);
  return (
    <option value={val}>{props.house.name}</option>
  );
}

export default HouseOption;
