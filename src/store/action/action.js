import { createAction } from 'redux-actions';
import * as types from './action.type';

export const loginClick = createAction(types.LOGIN_CLICK);
export const loginHint = createAction(types.LOGIN_HINT);
export const loginJoin = createAction(types.LOGIN_JOIN);
export const loginHintCnt = createAction(types.LOGIN_HINT_CNT);

export const loadWebView = createAction(types.LOAD_INIT);

export const themeDark = createAction(types.THEME_CHANGE_DARK);
export const themePrimary = createAction(types.THEME_CHANGE_PRIMARY);
export const changeStage = createAction(types.QUIZ_STAGE);

export const changeAnswers = createAction(types.QUIZ_ANSWERS);
export const changeHint = createAction(types.QUIZ_HINT); 