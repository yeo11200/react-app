import react, { useCallback, useEffect, useState } from 'react';

import * as Api from '../../../common';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage } from '../../../store/action/action';

const Qlist = ({history}) => {

    const [list, setList] = useState();

    const { stage } = useSelector((state) => ({stage : state.quizRedux}));

    const dispatch = useDispatch();

    console.log(stage);

    useEffect(() => {
        console.log(Api.quizListAPI);

        // axios.get(Api.quizListAPI, {}).then(res => console.log(res)).catch((e) => e);

    }, []);

    useEffect(() => {
        console.log(Api.quizListAPI);

        // axios.get(Api.quizListAPI, {}).then(res => console.log(res)).catch((e) => e);

    }, [stage]);

    const changeSubmit = useCallback((state) =>{
        dispatch(changeStage({stage : state}));
    }, [dispatch]);
    
    return(
        <div>
            Quiz

            <button onClick={() => changeSubmit(1)}>1</button>
        </div>
    )
}

export default Qlist;