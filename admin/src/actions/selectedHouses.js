export const getSelectedHouse = house => {
  return {
    type: "SELECTED_HOUSES",
    payload: new Promise((resolve, reject) => {
      resolve(house);
    })
  };
};
export const deleteSelectedHouse = house => {
  return {
    type: "DELETE_SELECT_HOUSE",
    payload: new Promise((resolve, reject) => {
      resolve(house);
    })
  };
};
