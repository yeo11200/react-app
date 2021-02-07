import { react, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeStage } from '../../../store/action/action';

const Step = ({ data }) => {

    console.log(data);

    const dispatch = useDispatch();

    const changeSubmit = useCallback((state) =>{
        dispatch(changeStage({stage : state}));
    }, [dispatch]);

    return(
        <div>
            <span onClick={() => changeSubmit(data.idx)}>{data.idx} : {data.stepTitle}</span>
        </div>
    )
}

export default Step;