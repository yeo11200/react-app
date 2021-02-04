import { combineReducers } from 'redux';
import loginRedux from './modules/login.redux';
import themeRedux from './modules/theme.redux';
import quizRedux from './modules/quiz.redux';

const rootReducer = combineReducers({
    loginRedux,
    themeRedux,
    quizRedux,
})

export default rootReducer;