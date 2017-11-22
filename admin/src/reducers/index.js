import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import children from "./child";
import parents from "./parent";
import houses from "./house";
import currentUser from "./login";
import selectedHouses from "./selectedHouses";
import medicines from "./medicine";

const rootReducer = combineReducers({
  children,
  parents,
  houses,
  currentUser,
  medicines,
  selectedHouses,
  form: formReducer
});

export default rootReducer;
