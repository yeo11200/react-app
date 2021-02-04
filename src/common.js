exports.memId = sessionStorage.getItem('MEMBER_ID');

const URL = (window.location.hostname == 'localhost') ? 'http://localhost:40000' : '//jinseop-api.click';
exports.quizListAPI = `${URL}/quiz/`;


exports.isEmpty = (params) => {
    return Object.keys(params).length > 0 ? true : false 
}