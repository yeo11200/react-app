import types from '../action/action.type';

const quizRedux = (state = {}, actions) => {
    switch(actions.type){
        case types.QUIZ_STAGE:
            return {
                stage : actions.payload
            }
        default:
            return state
    }
}

export default quizRedux;