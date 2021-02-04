exports.memId = sessionStorage.getItem('MEMBER_ID');

const URL = (window.location.hostname == 'localhost') ? 'http://localhost:4000' : '//jinseop-api.click';
exports.quizListAPI = `${URL}/quiz/list`;


exports.isEmpty = (params) => {
    return Object.keys(params).length > 0 ? true : false 
}