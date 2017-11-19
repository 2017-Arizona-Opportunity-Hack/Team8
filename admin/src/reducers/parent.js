let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "PARENT_PENDING":
      return state;
    case "PARENT_FULFILLED":
      console.log("Parent state", action.payload.data.all_parents);
      return action.payload.data.all_parents;
    case "PARENT_REJECTED":
      return state;

    case "PARENT_ADD_PENDING":
      return state;
    case "PARENT_ADD_FULFILLED":
      // console.log('in parent reducer >>> state', state);
      // console.log('in parent reducer >>> parent', action.payload.data.parent);
      // window.location.reload();
      console.log("parent add reducer", action.payload.data);
      return [...state, action.payload.data.parent];
    case "PARENT_ADD_REJECTED":
      return state;

    case "PARENT_UPDATE_PENDING":
      return state;
    case "PARENT_UPDATE_FULFILLED":
      // console.log("in PARENT_UPDATE reducer >> payload:", action.payload);
      // console.log("in PARENT_UPDATE reducer >> state:", state);
      var tmpArr = state;
      for (var i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i]._id === action.payload.data.parent._id) {
          tmpArr[i] = action.payload.data.parent;
        }
      }
      return [...tmpArr];
    case "PARENT_UPDATE_REJECTED":
      return state;

    case "PARENT_DELETE_PENDING":
      return state;
    case "PARENT_DELETE_FULFILLED":
      window.location.reload();
      return state.filter(parent => {
        return parent._id !== action.payload;
      });
    case "PARENT_DELETE_REJECTED":
      return state;

    default:
      return state;
  }
};
