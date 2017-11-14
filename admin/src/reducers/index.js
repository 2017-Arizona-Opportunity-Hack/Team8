import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import children from './child';
import parents from './parent';
import houses from './house';

const rootReducer = combineReducers({
  children,
  parents,
  houses,
  form: formReducer
});

export default rootReducer;
