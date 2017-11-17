import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import children from './child';
import parents from './parent';
import houses from './house';
import currentUser from './login';
import selectedHouses from './selectedHouses';

const rootReducer = combineReducers({
  children,
  parents,
  houses,
  currentUser,
  selectedHouses,
  form: formReducer
});

export default rootReducer;
