import { Route } from "react-router"
import { List } from './Board/index'


const index = () =>{
    return(
        <>
            <Route path="/test" component={List}></Route>
        </>
    )
}

export default index;