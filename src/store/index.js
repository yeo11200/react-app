import { combineReducers } from 'redux';
import loginRedux from './modules/login.redux';
import themeRedux from './modules/theme.redux';

const rootReducer = combineReducers({
    loginRedux,
    themeRedux
})

export default rootReducer;