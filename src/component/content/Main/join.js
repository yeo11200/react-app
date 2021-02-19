import React, { useCallback, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginJoin } from '../../../store/action/action';


const Join = ({ history }) => {

    console.log(history);

    const [ user, setUser ] = useState({
        userId : '',
        password : '',
        name : ''
    });

    const { userId, password, name} = user; 
    const dispatch = useDispatch();

    const changeJoinData = (e) => {

        const data = e.target;

        setUser({
            ...user,
            [data.name] : data.value
        })
    }

    const { userData } = useSelector((state) => ({ userData : state.loginRedux }));


    console.log(userData);
    
    const userJoin = useCallback(() => {
        dispatch(loginJoin({userId : 'test', password : 'test', name : 'test'}));
    }, [dispatch]);


    return(
        <div>
            회원가입
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>아이디</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's id" name="userId" onChange={(e) => changeJoinData(e)} value={userId}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's password" type="password" name="password" onChange={(e) => changeJoinData(e)}  value={password}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>이름</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Recipient's username" type="name" onChange={(e) => changeJoinData(e)}  value={name}/>
            </InputGroup>


            <Button variant="outline-secondary" onClick={() => userJoin()}>Button</Button>
        </div>
    )
}

export default Join;