import { combineReducers } from 'redux';
// budget
import budgetReducer from './budgetReducer';
// income
import incNameReducer from './incNameReducer';
import incValueReducer from './incValueReducer';
import incTotalReducer from './incTotalReducer';
// expense
import expNameReducer from './expNameReducer';
import expValueReducer from './expValueReducer';
import expTotalReducer from './expTotalReducer';

export default combineReducers({
    budget : budgetReducer,
    incNames : incNameReducer,
    incValues : incValueReducer,
    incTotal : incTotalReducer,
    expNames : expNameReducer,
    expValues : expValueReducer,
    expTotal : expTotalReducer
})