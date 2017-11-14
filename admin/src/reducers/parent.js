let initialState = [];

export default (state=initialState, action) => {

  switch (action.type) {

    case 'PARENT_PENDING':
      return state;
    case 'PARENT_FULFILLED':
      console.log('in PARENT reducer >> ', action.payload.data);
      return [...action.payload.data.all_parents];
    case 'PARENT_REJECTED':
      return state;

    default:
      return state;

  }

}
