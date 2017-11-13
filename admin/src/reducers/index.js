import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import houses from './house';

const rootReducer = combineReducers({
  houses,
  form: formReducer
});

export default rootReducer;
