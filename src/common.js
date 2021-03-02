const { loginJoin } = require("./store/action/action");
const axios = require('axios');

exports.memId = sessionStorage.getItem('MEMBER_ID');

const URL = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : '//api.jinseop-api.click';

const user = `${URL}/member/`;
exports.quiz = `${URL}/quiz/`;
exports.member = user;
// exports.quizListAPI = `${URL}/quiz/`;
// exports.quizListAPI = `${URL}/quiz/`;
// exports.quizListAPI = `${URL}/quiz/`;
// exports.quizListAPI = `${URL}/quiz/`;

exports.login = (data, callback) => {

    axios.post(`${user}login`, data).then(res => {
        const items = res.data;

        if(items.status === 200){

            const data = items.data;
            // window.memId = sessionStorage.setItem('MEMBER_ID', userId);
            // window.memPw = sessionStorage.setItem('MEMBER_PW', userPw);

            Object.assign(data.info, { loginYn : true });

            sessionStorage.setItem('member', JSON.stringify(data.info));

            callback(data.info); 
            
        }else{
            
            alert(items.data.err_msg);

        }
    }).catch(e => {

        alert(e);

    })
}

exports.isEmpty = (params) => {
    return Object.keys(params).length > 0 ? true : false 
}