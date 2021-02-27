import { react, useCallback } from 'react';
import { ButtonGroup, Card, Button  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage } from '../../../store/action/action';
import { CardText } from 'react-bootstrap-icons';
const Step = ({ data, index }) => {

    const dispatch = useDispatch();

    const changeSubmit = useCallback((state) =>{
        dispatch(changeStage({stage : state}));
    }, [dispatch]);

    const { loginData } = useSelector(state => ({ loginData : state.loginRedux }));
    
    return( 
    
        <Card style={{ width: '18rem', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} border={ (loginData.quiz.indexOf(index+1) > -1 && loginData?.quiz !== undefined ? 'primary' : '') }>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title><CardText></CardText>&nbsp;{data.stepTitle}</Card.Title>
                <Card.Text>
                    {index + 1} : {data.stepTitle}
                </Card.Text>
                <Button onClick={() => changeSubmit(data.idx)} variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    ) 
}

export default Step; 