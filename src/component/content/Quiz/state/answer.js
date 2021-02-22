import React from 'react';

const Answer = ({ answer, index, hint, anwserClick, answers}) => {

    console.log(answers);

    return(
        <div onClick={() => anwserClick(answer)} className={(hint?.hint === answer ? 'hint' : '')}>
            <input type='checkbox' value={answer} checked={(hint?.hint === answer || (answers !== undefined && answers.indexOf(answer) > -1) )} disabled={hint?.hint !== undefined && hint?.hint === answer}></input>
            <span>{index + 1} :</span>
            <span>{answer}</span>
        </div>
    )
}

export default Answer; 