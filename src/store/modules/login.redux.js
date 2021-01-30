import type from '../action/action.type';

const local = JSON.parse(localStorage.getItem('member'));

const initState = {
    'id' : local?.id,
    'loginYn' : false
}
const LoginRedux = (state = initState, action) => {

    switch(action.type){
        case type.LOGIN_CLICK:
            return {
                ...state,
                loginYn : true
            }
        default:
            return state
    }
}

export default LoginRedux;