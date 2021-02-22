import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../../common';
import { loginJoin } from "../../../store/action/action";


const Login = ({history, indexUser}) => {

    const [ user, setUser ] = useState({
        'id' : '',
        'pw' : ''
    })

    const { id, pw } = user;

    const dispatch = useDispatch();

    const insertData = (e) => {

        let data = e.target;

        setUser({
            ...user,
            [data.name] : data.value
        })
    }

    const goToJoin = () => {
        history.push('join');
    }

    const loginTest = () => {
        login(user, (data) => {
            dispatch(loginJoin(data));
        })
    }
    return(
        <div>
            로그인 페이지
            <br></br>
            <input name="id" value={id} onChange={(e) => insertData(e)} />
            <input name="pw" value={pw} onChange={(e) => insertData(e)} type="password"/>
            <br></br>
            <button onClick={() => loginTest()}>로그인</button>
            <button onClick={() => goToJoin()}>회원가입</button>
        </div>
    )
}

export default Login;