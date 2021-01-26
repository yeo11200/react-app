import type from '../action/action.type';

const LoginRedux = (state = null, action) => {

    console.log(action);
    switch(action.type){
        case type.LOGIN_CLICK:
            return {
                loginYn : action.payload
            }
        default:
            return state
    }
}

export default LoginRedux;