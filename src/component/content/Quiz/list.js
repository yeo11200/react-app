import react, { useCallback, useEffect, useState } from 'react';

import * as Api from '../../../common';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage } from '../../../store/action/action';

const Qlist = ({history}) => {

    const [list, setList] = useState();

    const [ stageList, setStageList] = useState();
    
    const { stage } = useSelector((state) => ({stage : state.quizRedux}));

    const dispatch = useDispatch();

    console.log(stage);

    useEffect(() => {
        console.log(Api.quizListAPI);

        axios.get(Api.quizListAPI, {}).then(res => {
            console.log(res);
            const items = res.data;

            setStageList(items.data);
        }).catch((e) => e);

    }, []);

    useEffect(() => {
        console.log(Api.quizListAPI);

        // axios.get(Api.quizListAPI, {}).then(res => console.log(res)).catch((e) => e);

    }, [stage]);

    const changeSubmit = useCallback((state) =>{
        dispatch(changeStage({stage : state}));
    }, [dispatch]);
    
    console.log(stageList);
    return(
        <div>
            Quiz
            {
                stageList === undefined ? <div>Loding</div> : stageList.list.map((value, index) => {
                    console.log(value);
                })
            }
            <button onClick={() => changeSubmit(1)}>1</button>
        </div>
    )
}

export default Qlist;