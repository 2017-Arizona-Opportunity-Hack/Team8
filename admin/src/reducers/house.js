let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "HOUSE_PENDING":
      return state;
    case "HOUSE_FULFILLED":
      return action.payload.data.all_houses;
    case "HOUSE_REJECTED":
      return state;

    case "HOUSE_ADD_PENDING":
      return state;
    case "HOUSE_ADD_FULFILLED":
      // let updatedArr = [...state];
      return [...state, action.payload.data.house];
    case "HOUSE_ADD_REJECTED":
      return state;

    case "HOUSE_UPDATE_PENDING":
      return state;
    case "HOUSE_UPDATE_FULFILLED":
      console.log("Here!", state);
      window.location.reload();
      console.log("Here2", action.payload.data);
      var tmpArr = state;
      for (var i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i]._id === action.payload.data.house._id) {
          tmpArr[i] = action.payload.data.house;
        }
      }
      return [...tmpArr];
    case "HOUSE_UPDATE_REJECTED":
      return state;

    case "HOUSE_DELETE_PENDING":
      return state;
    case "HOUSE_DELETE_FULFILLED":
      window.location.reload();
      return state.filter(house => {
        return house._id !== action.payload;
      });
    case "HOUSE_DELETE_REJECTED":
      return state;

    default:
      return state;
  }
};
