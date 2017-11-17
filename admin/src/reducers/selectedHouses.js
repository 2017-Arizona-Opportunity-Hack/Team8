let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case "SELECTED_HOUSES_PENDING":
      return state;
    case "SELECTED_HOUSES_FULFILLED":
      // console.log('in selectedHouses reducer, payload: ', action.payload);
      return [...state, ...action.payload];
    case "SELECTED_HOUSES_REJECTED":
      return state;

    default:
      return state;

  }
}
