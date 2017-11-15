let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHILD_PENDING":
      return state;
    case "CHILD_FULFILLED":
      return action.payload.data.all_children;
    case "CHILD_REJECTED":
      return state;

    case "CHILD_ADD_PENDING":
      return state;
    case "CHILD_ADD_FULFILLED":
      // let updatedArr = [...state];
      state.push(action.payload.data.child);
      return state;
    case "CHILD_ADD_REJECTED":
      return state;

    case "CHILD_UPDATE_PENDING":
      return state;
    case "CHILD_UPDATE_FULFILLED":
      console.log("in CHILD_UPDATE reducer >> ", action.payload);
      return [...action.payload.data.all_children];
    case "CHILD_UPDATE_REJECTED":
      return state;

    case "CHILD_DELETE_PENDING":
      return state;
    case "CHILD_DELETE_FULFILLED":
      return state.filter(child => {
        return child._id !== action.payload;
      });
    case "CHILD_DELETE_REJECTED":
      return state;

    default:
      return state;
  }
};
