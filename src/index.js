import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/**
 * react-router -> history를 담당하는 browserHistory X 
 * npm install --save history 추가
 * 
 * Router history={createBrowserHistory} : TypeError: history.listen is not a function 에러가 발생
 * 해결 : Router history={createBrowserHistory()}
 */
import { createBrowserHistory } from 'history';

/**
 * react-router-dom : 웹 전용 router 추가
 * react-router : 웹/앱 전용 router 추가
 * react-native-router : 앱 전용 router 추가
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-icons';

/**
 * redux를 위한 설정
 */
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/store/index';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory}>
            <Route path="/" component={ App }></Route>
        </Router>
    </Provider>
    , 
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)) 
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
