import react, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { quiz } from '../../../common';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage, changeAnswers, changeHint, loginHintCnt } from '../../../store/action/action';
import Question from './state/question';
import * as Fun from '../../../fun';
import DefaultApi from '../../../axios';

const QuizList = ({ idx }) => {

    const dispatch = useDispatch();

    const stage = idx.stage;

    // 퀴즈에 대한 리스트와 현재 풀고있는 index값 저장 
    // 스테이지 종료시 삭제
    const quizData = JSON.parse(sessionStorage.getItem(`quizStage${stage}`)) ?? undefined;

    // 이전 답변에 대한 답 : 스테이지가 끝나면 remove 후 DB에 저장
    const beforeAnswer = JSON.parse(sessionStorage.getItem(`answer${stage}`)) ?? [];

    const beforeHint = JSON.parse(sessionStorage.getItem(`hint${stage}`)) ?? [];

    const [ quizList, setQuizList ] = useState(quizData?.data);

    const [ quesIndex, setQuesIndex ]  = useState(1);

    const { loginData } = useSelector(state => ({ loginData : state.loginRedux }));
 
    useEffect(() => {

        // 스테이지 시작시 해당하는 데이터를 불러오지만, count와 undefined 여부 파악후 DB에 저장
        if(quizList === undefined || quizData?.data?.cnt <= 0){
            DefaultApi.get(`/quiz/${stage}`).then(res => {
            
                const items = res.data;
                sessionStorage.setItem(`quizStage${stage}`, JSON.stringify({'stage' : stage, 'data' : items.data }));
                setQuizList(items.data);
            }).catch(e => console.log(e));
        }

        return () => {
            console.log('컴포넌트 아웃');
        }

    }, []);

    // 다음 스텝으로 넘어가는 함수, 정답여부 및 다음으로 넘어가는 함수
    const nextIndex = (index, answers) => {

        DefaultApi.get(`/quiz/anwser?idx=${index}&answers=${answers}`).then((res) => {
            const items = res.data;

            if(items.status === 200){
                Object.assign(quizData, {'index' : index+1});
                sessionStorage.setItem(`quizStage${stage}`, JSON.stringify(quizData));
                
                beforeAnswer.push( {'index' : index, 'answers' : answers});

                sessionStorage.setItem(`answer${stage}`, JSON.stringify(beforeAnswer));

                setQuesIndex(index+1);

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
        if(beforeAnswer.length > 0){
            for(let i=0; i<beforeAnswer.length; i++){
                if(beforeAnswer[i].index === quesIndex){
                    updateAnswer({answers : beforeAnswer[i]?.answers});
                }
            }
        }

        if(beforeHint.length > 0){
            for(let i=0; i<beforeHint.length; i++){
                if(beforeHint[i].index === quesIndex){
                    updateHint({hint : beforeHint[i]?.hint});
                }
            }
        }

    }, [quesIndex])

    const hintData = (idx) => {

        const beforeHint = JSON.parse(sessionStorage.getItem(`hint${stage}`)) ?? [];

        let hint = '';
        if(beforeHint.length > 0){
            for(let i=0; i<beforeHint.length; i++){
                if(beforeHint[i].index === quesIndex){
                    hint = beforeHint[i].hint;
                }
            }
        }

        axios.get(`${quiz}hint/${idx}?hint=${hint}`).then((res) => {
            const items = res.data;

            if(items.status === 200){

                if(Fun.emptyYn(items.data) === false){

                    if(beforeHint.length > 0){
                        for(let i=0; i<beforeHint.length; i++){
                            if(beforeHint[i].index === quesIndex){
                                const data = beforeHint[i]?.hint === undefined ? items.data.lists : beforeHint[i]?.hint + `,${items.data.lists}`;
                            
                                beforeHint.push( {'index' : quesIndex, 'hint' : data});
                                updateHintCount(loginData.hintCnt - 1);
                            }else{
                                beforeHint.push( {'index' : quesIndex, 'hint' : items.data.lists});
                            }
                        }
                    }else{
                        beforeHint.push( {'index' : quesIndex, 'hint' : items.data.lists});
                    }
                    
                    sessionStorage.setItem(`hint${stage}`, JSON.stringify(beforeHint));
                }else{
                    alert('더이상 없습니다.');
                }
                
            }else{
                console.log(items.data.errMsg);
            }
        }).catch(e => console.log(e));
    }

    const updateHint = useCallback((data) => {
        dispatch(changeHint(data));
    }, [dispatch]);
    
    const hintClick = (idx) => {
        hintData(idx);
    }

    const updateHintCount = useCallback((data) => {
        dispatch(loginHintCnt({ hintCnt : data}));
    }, [dispatch]);

    const endQuiz = () => {
        axios.post(`${quiz}${stage}`, {mId : loginData.idx}).then(res => {

            if(res.status === 200){
                sessionStorage.removeItem(`quizStage${stage}`);
                sessionStorage.removeItem(`answer${stage}`);
                sessionStorage.removeItem(`hint${stage}`);
            }else{
                console.log('디비에러');
            }
            
        }).catch((e) => {
            console.log(e);
        })
    }

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
                                        nextIndex={nextIndex}
                                        hintClick={hintClick}
                                        count={quizList.list.length}
                                        endQuiz={endQuiz}/>
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