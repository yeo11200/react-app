import react, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as Api from '../../../common';
import { useDispatch } from 'react-redux';
import { changeStage, changeAnswers } from '../../../store/action/action';
import Question from './state/question';

const QuizList = ({ idx }) => {

    const dispatch = useDispatch();

    const stage = idx.stage;

    // 퀴즈에 대한 리스트와 현재 풀고있는 index값 저장 
    // 스테이지 종료시 삭제
    const quizData = JSON.parse(localStorage.getItem(`quizStage${stage}`)) ?? undefined;

    // 이전 답변에 대한 답 : 스테이지가 끝나면 remove 후 DB에 저장
    const beforeAnswer = JSON.parse(localStorage.getItem(`answer${stage}`)) ?? [];

    const [ quizList, setQuizList ] = useState(quizData?.data);

    const [ quesIndex, setQuesIndex ]  = useState(quizData?.index ?? 0);

    useEffect(() => {

        // 스테이지 시작시 해당하는 데이터를 불러오지만, count와 undefined 여부 파악후 DB에 저장
        if(quizList === undefined || quizData.data?.cnt <= 0){
            axios.get(`http://localhost:40000/quiz/${stage}`).then(res => {
            
                const items = res.data;
                localStorage.setItem(`quizStage${stage}`, JSON.stringify({'stage' : stage, 'data' : items.data }));
                setQuizList(items.data);
            }).catch(e => console.log(e));
        }

        return () => {
            console.log('컴포넌트 아웃');
        }

    }, []);

    // 다음 스텝으로 넘어가는 함수, 정답여부 및 다음으로 넘어가는 함수
    const nextIndex = (index, answers) => {

        setQuesIndex(index+1);

        beforeAnswer.push( {'index' : index, 'answers' : answers});

        localStorage.setItem(`answer${stage}`, JSON.stringify(beforeAnswer));

        axios.get(`http://localhost:40000/quiz/anwser?idx=${index}&answers=${answers}`).then((res) => {
            const items = res.data;

            if(items.status === 200){
                Object.assign(quizData, {'index' : index+1});
                localStorage.setItem(`quizStage${stage}`, JSON.stringify(quizData));
                
            }else{
                console.log(items.data.errMsg);
            }
        }).catch(e => console.log(e));
        
    }

    const backStage = useCallback(() => { dispatch(changeStage({stage : undefined}))}, [dispatch]);

    const backIndex = (index) => {

        if(index === 0){
            backStage();
        }else{
            setQuesIndex(index-1);
        }

    }

    const updateAnswer = useCallback((data) => {
        dispatch(changeAnswers(data));
    }, [dispatch]);

    useEffect(() => {
        console.log(quesIndex);

        console.log(beforeAnswer);

        if(beforeAnswer.length > 0){
            for(let i=0; i<beforeAnswer.length; i++){
                if(beforeAnswer[i].index === quesIndex){
                    updateAnswer({answers : beforeAnswer[i]?.answers});
                }
            }
        }
    }, [quesIndex])


    return(
        <div>
            
            {
                (() => {
                    if(quizList === undefined){
                        return(<div>로딩중</div> )
                    }else{

                        if(quizList.cnt > 0){
                            return quizList.list.map((value, index) => {
                                return (
                                    <Question 
                                        quesIndex={quesIndex} 
                                        backStage={backStage}
                                        backIndex={backIndex}
                                        value={value}
                                        index={index}
                                        nextIndex={nextIndex}/>
                                )
                            })
                        }else{
                            return(
                                <div>데이터 실패</div>
                            )
                        }
                    }
                })()
            }

        </div>
    )
}

export default QuizList;