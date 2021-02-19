import type from '../action/action.type';

const local = JSON.parse(localStorage.getItem('member'));

const initState = {
    ...local,
    'loginYn' : false
}

const LoginRedux = (state = initState, action) => {

    switch(action.type){
        case type.LOGIN_CLICK:
            return {
                ...state,
                loginYn : true
            }
        case type.LOGIN_JOIN: {
            return {
                ...state,
                userId : action.payload.userId,
                password : action.payload.password,
                name : action.payload.name,
                loginYn : true
            }
        }
        default:
            return state
    }
}

export default LoginRedux;