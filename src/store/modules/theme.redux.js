import types from '../action/action.type';


const initState = {
    'themeState' : 'dark'
}

const themeRedux = (state = initState, actions) => {

    switch(actions.type){
        case types.THEME_CHANGE_DARK:
            return {
                ...state,
                themeState : actions.payload
            }
        case types.THEME_CHANGE_PRIMARY:
            return {
                ...state,
                themeState : actions.payload
            }
        default:
            return state
    }
}

export default themeRedux; 