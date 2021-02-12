import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


const Question = ({ quesIndex, backIndex, backStage, value, index, nextIndex }) => {


    const dispatch = useDispatch();
    
    const quiz = useSelector((state) => ({quiz : state.quizRedux}));

    console.log(quiz);

    const [ answers, setAnsers ] = React.useState(quiz.answer);

    const anwserClick = (answer) => {

        if(answers.includes(answer) === true){
            return;
        }

        answer = answers === '' ? answer : answers+','+answer;

        setAnsers(answer);
    }

    /**
     * API 정답은 DB의 정답을 기준으로 반복을 돌리고, 해당하는 데이터에 정답이 모두 있을 경우 리턴 아닐 경우 false
     * 힌트보기는, while(true)로 반복을 돌려서, 해당하는 데이터가 같으면 또 돌리고, 그게 아닐 경우에는 안돌린다.(힌트에 대한 로그는 디비로 저장)
     * 정답의 갯수, 남은 갯수가 같거나 주관식이면 힌트보기 삭제
     */

    return(
        
        <Modal 
            show={quesIndex === index} 
            onHide={() => backStage()} 
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>

            <Modal.Header closeButton>
                <Modal.Title>{index+1}. {value.questions}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {
                        value.lists.map((answer, index) => {
                            return (
                                <div onClick={() => anwserClick(answer)}>
                                    <input type='checkbox' value={answer}></input>
                                    <span>{index + 1} :</span>
                                    <span>{answer}</span>
                                </div>
                            )
                        })
                    }    
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => backIndex(quesIndex)}>
                    Back Step
                </Button>

                <Button variant="secondary">
                    힌트보기
                </Button>
                <Button variant="primary" onClick={() => nextIndex(index, '1')}>
                    Nest Step
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default Question;