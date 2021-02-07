import { useEffect, useState } from 'react';

import * as Api from '../../../common';

import axios from 'axios';
import { useSelector } from 'react-redux';
import Step from './step';
import QuizList from './quiz.list';

const Qlist = ({history}) => {

    const [ stageList, setStageList] = useState();
    
    /**
      * arrow function을 사용할 경우, 객체 return은 ()를 포함 후에 return
      * 한줄의 논리일 경우 자동 return
      */
    const { stage } = useSelector((state) => ({stage : state.quizRedux}));


    useEffect(() => {

        axios.get(Api.quizListAPI, {}).then(res => {

            const items = res.data;
            setStageList(items.data);

        }).catch((e) => e);

    }, []);


    return(
        <div>
            Quiz
            {
                stage.stage?.stage === undefined ? 
                    stageList === undefined ? <div>Loding</div> : stageList.list.map((value, index) => {
                        return (<Step data={value}></Step>)
                    })
                 : <QuizList idx={stage.stage}></QuizList>
            }
        </div>
    )
}

export default Qlist;