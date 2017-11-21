let initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case "MEDICINE_PENDING":
            return state;
        case "MEDICINE_FULFILLED":
            console.log("Parent state", action.payload.data.all_parents);
            return action.payload.data.all_parents;
        case "MEDICINE_REJECTED":
            return state;

        case "MEDICINE_ADD_PENDING":
            return state;
        case "MEDICINE_ADD_FULFILLED":
            // console.log('in parent reducer >>> state', state);
            // console.log('in parent reducer >>> parent', action.payload.data.parent);
            // window.location.reload();
            console.log("medicine add reducer", action.payload.data);
            return [...state, action.payload.data.parent];
        case "MEDICINE_ADD_REJECTED":
            return state;

        case "MEDICINE_UPDATE_PENDING":
            return state;
        case "MEDICINE_UPDATE_FULFILLED":
            // console.log("in PARENT_UPDATE reducer >> payload:", action.payload);
            // console.log("in PARENT_UPDATE reducer >> state:", state);
            var tmpArr = state;
            for (var i = 0; i < tmpArr.length; i++) {
                if (tmpArr[i]._id === action.payload.data.medicine._id) {
                    tmpArr[i] = action.payload.data.medicine;
                }
            }
            return [...tmpArr];
        case "MEDICINE_UPDATE_REJECTED":
            return state;

        case "MEDICINE_DELETE_PENDING":
            return state;
        case "MEDICINE_DELETE_FULFILLED":
            window.location.reload();
            return state.filter(parent => {
                return medicine._id !== action.payload;
            });
        case "MEDICINE_DELETE_REJECTED":
            return state;

        default:
            return state;
    }
};
