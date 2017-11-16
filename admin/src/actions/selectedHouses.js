export const getSelectedHouse = (house) => {
  return {
    type: "SELECTED_HOUSES",
    payload: new Promise((resolve, reject) => {
      resolve(house);
    })
  };
}
