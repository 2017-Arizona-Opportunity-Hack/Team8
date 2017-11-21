let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_PENDING":
      return state;
    case "AUTH_FULFILLED":
      console.log("in login reducer >>> payload", action.payload);
      if (action.payload.data.success === 1) {
        console.log("in login reducer >>> login success", action.payload.data);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        return action.payload.data;
      } else {
        console.log("in login reducer >>> login failed");
        return action.payload.data;
      }
    case "AUTH_REJECTED":
      return state;

    default:
      return state;

    case "N_AUTH_PENDING":
      return state;
    case "N_AUTH_FULFILLED":
      console.log("auth fill full", action.payload);
      localStorage.removeItem("user");
      return state;
    case "N_AUTH_REJECTED":
      return state;
  }
};
