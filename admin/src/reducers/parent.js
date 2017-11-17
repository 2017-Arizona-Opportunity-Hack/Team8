let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "PARENT_PENDING":
      return state;
    case "PARENT_FULFILLED":
      return action.payload.data.all_parents;
    case "PARENT_REJECTED":
      return state;

    case "PARENT_ADD_PENDING":
      return state;
    case "PARENT_ADD_FULFILLED":
      // console.log('in parent reducer >>> state', state);
      // console.log('in parent reducer >>> parent', action.payload.data.parent);
      window.location.reload();
      return [...state, action.payload.data.parent];
    case "PARENT_ADD_REJECTED":
      return state;

    case "PARENT_UPDATE_PENDING":
      return state;
    case "PARENT_UPDATE_FULFILLED":
      // console.log("in PARENT_UPDATE reducer >> payload:", action.payload);
      // console.log("in PARENT_UPDATE reducer >> state:", state);
      window.location.reload();
      let tmpArr = state.filter(
        parent => parent._id !== action.payload.data.parent._id
      );
      return [...tmpArr, action.payload.data.parent];
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
