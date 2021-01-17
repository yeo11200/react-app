import { Route, Switch } from "react-router"
import { List, View } from './Board/index'
import { Main, Login } from './Main/index'
import useSWR, { mutate } from 'swr';

const Index = ({ match, history }) =>{

    let memId = sessionStorage.getItem('MEMBER_ID') ? sessionStorage.getItem('MEMBER_ID')  : '';

    console.log(memId);

    return(
        <>
            {
                (() => {
                    console.log(memId);

                    if(memId === ''){
                        return(
                            <Login></Login>
                        )
                    }else{
                        return(
                            <div>
                                <Route path="/" exact component={Main}></Route>
                                <Switch>
                                    <Route exact path="/test" component={List}></Route>
                                    <Route path="/test/:id" component={View}></Route>
                                </Switch>
                            </div>
                        )
                    }
                })()
            } 
        </>
    )
}

export default Index;