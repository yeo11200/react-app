import { react, useCallback } from 'react';
import { ButtonGroup, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeStage } from '../../../store/action/action';

const Step = ({ data }) => {

    console.log(data);

    const dispatch = useDispatch();

    const changeSubmit = useCallback((state) =>{
        dispatch(changeStage({stage : state}));
    }, [dispatch]);

    return( 
    
        <Card style={{ width: '18rem' }} border='primary'>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{data.stepTitle}</Card.Title>
                <Card.Text>
                    {data.idx} : {data.stepTitle}
                </Card.Text>
                <ButtonGroup onClick={() => changeSubmit(data.idx)} variant="primary">Go somewhere</ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default Step; 