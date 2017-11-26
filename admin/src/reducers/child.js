let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHILD_PENDING":
      return state;
    case "CHILD_FULFILLED":
      var st = action.payload.data.all_children;
      for (var i = 0; i < st.length; i++) {
        var d = JSON.stringify(st[i]["house"]);
        st[i]["house"] = d;
      }
      return st;
    case "CHILD_REJECTED":
      return state;

    case "CHILD_ADD_PENDING":
      return state;
    case "CHILD_ADD_FULFILLED":
      // let updatedArr = [...state];
      console.log("Halllele", action.payload.data.child);
      var st = action.payload.data.child;
      var d = JSON.stringify(st["house"]);
      st["house"] = d;
      return [...state, st];
    case "CHILD_ADD_REJECTED":
      return state;

    case "CHILD_UPDATE_PENDING":
      return state;
    case "CHILD_UPDATE_FULFILLED":
      console.log("in CHILD_UPDATE reducer >> ", action.payload);
      var tmpArr = state;
      for (var i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i]._id === action.payload.data.child._id) {
          var st = action.payload.data.child;
          var d = JSON.stringify(st["house"]);
          st["house"] = d;
          tmpArr[i] = st;
        }
      }
      return [...tmpArr];
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
