import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../../common';
import { loginJoin } from "../../../store/action/action";
import { Button } from 'react-bootstrap';

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

    const loginCallback = () => {
        login(user, (data) => {
            dispatch(loginJoin(data));
        })
    }

    return(
        <div>
            로그인 페이지 
            <div className={'margin-bottom'}>
                <label> 아이디 : 
                    <input name="id" className={'margin'} value={id} onChange={(e) => insertData(e)} />
                </label>
                <label className={'margin'}> 비밀번호 : 
                    <input className={'margin'} name="pw" value={pw} onChange={(e) => insertData(e)} type="password"/>
                </label>
            </div>
            <Button onClick={() => loginCallback()}>로그인</Button>
            <Button  className={'margin'} onClick={() => goToJoin()}>회원가입</Button>
        </div>
    )
}

export default Login;