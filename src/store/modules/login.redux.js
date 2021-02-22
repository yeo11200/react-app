import type from '../action/action.type';

const local = JSON.parse(sessionStorage.getItem('member'));

const initState = {
    ...local,
    loginYn : local?.loginYn === undefined ? false : true
}

const LoginRedux = (state = initState, action) => {

    switch(action.type){
        case type.LOGIN_JOIN: {
            return {
                ...state,
                email : action.payload.email,
                nickname : action.payload.nickname,
                token : action.payload.token,
                type : action.payload.type,
                loginYn : action.payload.loginYn,
                hintCnt : action.payload.hintCnt,
                quiz : action.payload.quiz
            }
        }
        case type.LOGIN_HINT_CNT : {
            return {
                ...state, 
                hintCnt : action.payload.hintCnt
            }
        }
        default:
            return state
    }
}

export default LoginRedux;