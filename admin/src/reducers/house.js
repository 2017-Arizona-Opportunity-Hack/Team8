let initialState = [];

export default (state=initialState, action) => {

  switch (action.type) {

    case 'HOUSE_PENDING':
      return state;
    case 'HOUSE_FULFILLED':
      return [...action.payload.data];
    case 'HOUSE_REJECTED':
      return state;

    default:
      return state;

  }

}
