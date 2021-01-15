import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, browserHistory } from 'react-router';
/**
 * react-router-dom : 웹 전용 router 추가
 * react-router : 웹/앱 전용 router 추가
 * react-native-router : 앱 전용 router 추가
 */
ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
