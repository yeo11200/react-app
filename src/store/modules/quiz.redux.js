import types from '../action/action.type';

const quizRedux = (state = {}, actions) => {
    switch(actions.type){
        case types.QUIZ_STAGE:
            return {
                stage : actions.payload
            }
        case types.QUIZ_ANSWERS:
            return {
                ...state,
                answer : actions.payload
            }
        case types.QUIZ_HINT:
            return {
                ...state,
                hint : actions.payload
            }
        default:
            return state
    }
}

export default quizRedux; 