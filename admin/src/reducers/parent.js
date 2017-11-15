let initialState = [];

export default (state=initialState, action) => {

  switch (action.type) {

    case 'PARENT_PENDING':
      return state;
    case 'PARENT_FULFILLED':
      return action.payload.data.all_parents;
    case 'PARENT_REJECTED':
      return state;

    case 'PARENT_ADD_PENDING':
      return state;
    case 'PARENT_ADD_FULFILLED':
      let updatedArr = [...state]
      updatedArr.push(action.payload.data.parent)
      return updatedArr;
    case 'PARENT_ADD_REJECTED':
      return state;

    case 'PARENT_UPDATE_PENDING':
      return state;
    case 'PARENT_UPDATE_FULFILLED':
      console.log('in PARENT_UPDATE reducer >> ', action.payload);
      return [...action.payload.data.all_parents];
    case 'PARENT_UPDATE_REJECTED':
      return state;

    case 'PARENT_DELETE_PENDING':
      return state;
    case 'PARENT_DELETE_FULFILLED':
      return state.filter(parent => {
        return parent._id !== action.payload;
      });
    case 'PARENT_DELETE_REJECTED':
      return state;

    default:
      return state;

  }

}
