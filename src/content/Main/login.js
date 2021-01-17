import { useState } from "react";


const Login = ({history, indexUser}) => {

    let [ user, setUser ] = useState({
        'userId' : '',
        'userPw' : ''
    })

    let memId = sessionStorage.getItem('MEMBER_ID') ? sessionStorage.getItem('MEMBER_ID')  : '';

    if(memId !== ''){
        history.push('/');
    }

    let { userId, userPw } = user;

    const insertData = (e) => {

        let data = e.target;

        setUser({
            ...user,
            [data.name] : data.value
        })
    }

    const login = () => {

        window.memId = sessionStorage.setItem('MEMBER_ID', userId);
        window.memPw = sessionStorage.setItem('MEMBER_PW', userPw);

        indexUser({
            'memId' : userId
        });
    }
    

    return(
        <div>
            로그인 페이지
            <br></br>
            <input name="userId" value={userId} onChange={(e) => insertData(e)} />
            <input name="userPw" value={userPw} onChange={(e) => insertData(e)} />
            <br></br>
            <button onClick={login}>로그인</button>
        </div>
    )
}

export default Login;