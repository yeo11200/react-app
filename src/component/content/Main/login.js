import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginClick, loginJoin } from "../../../store/action/action";
import { axios } from 'axios';


const Login = ({history, indexUser}) => {

    const [ user, setUser ] = useState({
        'userId' : '',
        'userPw' : ''
    })

    const { userId, userPw } = user;

    let memId = sessionStorage.getItem('MEMBER_ID') ? sessionStorage.getItem('MEMBER_ID')  : '';

    const { loginData } = useSelector((state) => ({loginData : state.loginRedux}));

    const dispatch = useDispatch();

    const insertData = (e) => {

        let data = e.target;

        setUser({
            ...user,
            [data.name] : data.value
        })
    }

    const goToJoin = () => {
        // dispatch(increase);
        history.push('join');
    }

    const login = () => {

        window.memId = sessionStorage.setItem('MEMBER_ID', userId);
        window.memPw = sessionStorage.setItem('MEMBER_PW', userPw);

        Object.assign(user, { loginYn : true });


        loginRedux(user);
        // axios.post('', user).then(res => {
        //     const items = res.data;

        //     if(items){
        //         loginRedux();
        //     }else{

        //     }
        // }).catch(e => {
        //     console.log(e);
        // })
    }

    const loginRedux = useCallback((e) => {
        dispatch(loginJoin(e));
    }, [dispatch])
    
    console.log(loginData);

    return(
        <div>
            로그인 페이지
            <br></br>
            <input name="userId" value={userId} onChange={(e) => insertData(e)} />
            <input name="userPw" value={userPw} onChange={(e) => insertData(e)} type="password"/>
            <br></br>
            <button onClick={login}>로그인</button>
            <button onClick={() => goToJoin()}>회원가입</button>
        </div>
    )
}

export default Login;