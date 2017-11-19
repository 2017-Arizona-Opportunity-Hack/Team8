let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_HOUSES_PENDING":
      return state;
    case "SELECTED_HOUSES_FULFILLED":
      console.log("in selectedHouses reducer, payload: ", action.payload);
      return [...state, action.payload];
    case "SELECTED_HOUSES_REJECTED":
      return state;

    case "DELETE_SELECT_HOUSE_PENDING":
      return state;
    case "DELETE_SELECT_HOUSE_FULFILLED":
      console.log("in deleteHouse reducer, payload: ", state);
      let tmpArr = state.filter(house => house._id !== action.payload._id);
      return [...tmpArr];
    case "DELETE_SELECT_HOUSE_REJECTED":
      return state;

    default:
      return state;
  }
};
