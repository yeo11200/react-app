import React, { useCallback, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { member, login } from '../../../common';
import axios from 'axios';
import { loginJoin } from '../../../store/action/action';


const Join = ({ history }) => {

    const style = {
        left : {
            marginLeft: '10px'  
        }
    }

    const [ user, setUser ] = useState({
        id : '',
        pw : '',
        nickname : ''
    });

    const { id, pw, nickname} = user; 
    const dispatch = useDispatch();

    const changeJoinData = (e) => {

        const data = e.target;

        setUser({
            ...user,
            [data.name] : data.value
        })
    }

    const userJoin = useCallback(() => {

        axios.post(`${member}registor`, user).then(res => {
            const items = res.data;
            if(items.status === 200){
                delete user.nickname;
                login(user, (data) => {
                    dispatch(loginJoin(data));
                });
            }else{
                console.log(items);
            }
        }).catch(e => {
            console.log(e);
        })
    })

    const goToLogin = () => {
        history.push('login');
    }

    return(
        <div>
            회원가입
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>아이디</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's id" name="id" onChange={(e) => changeJoinData(e)} value={id}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's password" type="password" name="pw" onChange={(e) => changeJoinData(e)}  value={pw}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>이름</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's username" name="nickname" onChange={(e) => changeJoinData(e)}  value={nickname}/>
            </InputGroup>


            <Button variant="outline-secondary" onClick={() => userJoin()}>Join</Button>
            <Button variant="outline-secondary" className={'margin'} onClick={() => goToLogin()}>로그인</Button>
        </div>
    )
}


export default Join;