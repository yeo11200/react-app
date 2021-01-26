import { combineReducers } from 'redux';
import loginRedux from './modules/login.redux';

const rootReducer = combineReducers({
    loginRedux
})

export default rootReducer;