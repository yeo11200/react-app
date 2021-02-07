import react, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as Api from '../../../common';
import { useDispatch } from 'react-redux';
import { changeStage } from '../../../store/action/action';
const QuizList = ({ idx }) => {

    const dispatch = useDispatch();

    const stage = idx.stage;

    const quizData = JSON.parse(localStorage.getItem(`quizStage${stage}`)) ?? undefined;

    const [quizList, setQuizList] = useState(quizData?.data);

    const [ quesIndex, setQuesIndex ]  = useState(quizData?.index ?? 0);

    useEffect(() => {

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


    const nextIndex = (index) => {

        axios.get(`http://localhost:40000/quiz/anwser?idx=${index}&answers=1`).then((res) => {
            const items = res.data;

            if(items.status === 200){

                setQuesIndex(index+1);
        
                Object.assign(quizData, {'index' : index+1});
                localStorage.setItem(`quizStage${stage}`, JSON.stringify(quizData));
                
            }else{
                console.log(items.data.errMsg);
            }
        }).catch(e => console.log(e));
        
    }

    const backStage = useCallback(() => { dispatch(changeStage({stage : undefined}))}, [dispatch]);

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
                                    <div className={'quiz-state' + index + (quesIndex === index ? ' on' : '')}>
                                        <div>
                                            <span> 질문 : {value.questions}</span>
                                        </div>

                                        <div>
                                            {
                                                value.lists.map((answer, index) => {
                                                    return (
                                                        <div>
                                                            <span>{index + 1} : {answer}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <button onClick={() => nextIndex(index)}> 다음 </button>
                                        <button> 힌트보기 </button>
                                    </div>
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

            <div onClick={() => backStage()}>뒤로가기</div>
        </div>
    )
}

export default QuizList;