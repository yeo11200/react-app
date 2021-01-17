import { Route, Switch } from "react-router"
import { List, View } from './Board/index'
import { Main, Login } from './Main/index'
import ErrorPage from './Error/index'
import react, { useState } from 'react'
import useSWR, { mutate } from 'swr';
import comm from '../common';

const Index = ({ match, history }) =>{

    return(
        <>
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route exact path="/test" component={List}></Route>
                <Route path="/test/:id" component={View}></Route>
                <Route path="*" exact component={ErrorPage}></Route>
            </Switch>
            
        </>
    )
}

export default Index;