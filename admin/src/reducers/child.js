let initialState = [];

export default (state=initialState, action) => {

  switch (action.type) {

    case 'CHILD_PENDING':
      return state;
    case 'CHILD_FULFILLED':
      return [...action.payload.data];
    case 'CHILD_REJECTED':
      return state;

    default:
      return state;

  }

}
