let initialState = [];

export default (state = initialState, action) => {

  switch (action.type) {
    case "AUTH_PENDING":
      return state;
    case "AUTH_FULFILLED":
      console.log('in login reducer >>> payload', action.payload);
      if (action.payload.data.success === 1) {
        console.log('in login reducer >>> login success');
        return ['userAuth'];
      } else {
        console.log('in login reducer >>> login failed');
        return null;
      }
    case "AUTH_REJECTED":
      return state;

    default:
      return state;
    }

}
