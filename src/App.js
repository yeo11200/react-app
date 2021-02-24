import logo from './logo.svg';
import './App.css';
import Header from './component/_include/header';
import Footer from './component/_include/footer';
import Content from './component/content/index';
import React, { useEffect, useState } from 'react';
import { Login, Join } from './component/content/Main';
import { useSelector } from 'react-redux';

function App({history, match}) {

  let [mode, setMode] = useState('dark');

  let [ user, setUser ] = useState({
      memId : sessionStorage.getItem('MEMBER_ID') ? sessionStorage.getItem('MEMBER_ID') : '',
  });

  let { memId } = user;
  
  const nowPath = history.location.pathname;

  const { loginData } = useSelector(state => ({ loginData : state.loginRedux }));
  const { themeStats } = useSelector(state => ({themeStats : state.themeRedux }));

  // 함수가 선언될 경우 postMessage로 해당하는 메세지리를 보낸다
  const sendPostMessageToRN = async (message) => {

    var value = {
      'type'  : "OnClick",
      'state' : 'web -> rn'
    }

    await (window["ReactNativeWebView"]||window).postMessage(JSON.stringify(value));
  }

  useEffect(() => {


    sendPostMessageToRN();

    if ((window["ReactNativeWebView"]||window)) {

      /**
       * message 이벤트 RN에서 webView로 데이터를 넘길 때 사용하는 이벤트
       * 
       * ios = window, android = document 차이가 있다.
       */
  
      const isUIWebView = () => {
        /**
         * 정규식을 통해서 os 버전을 확인한다.
         */
        return navigator.userAgent
          .toLowerCase()
          .match(/\(ip.*applewebkit(?!.*(version|crios))/)
      }
  
      const receiver = isUIWebView() ? window : document
  
  
      /** android */
      receiver.addEventListener("message", webLog);
    } else {
      // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
      alert('error');
    }

  }, []);

  useEffect(() => {

    console.log('test');

    if(loginData.loginYn === false){
      history.push('/login');
    }else{

      // ip 로그쌓을 API
      history.push('/quiz');
    }
  }, [loginData])

  const webLog = (e) => {

    const event = JSON.parse(e.data);
    alert(event.data);
  }

  return (
    <div className="App">
      {
        ((loginData) => {
          
          if(loginData.loginYn === false){
            return(
              <>
                <h2>Sample Quiz</h2>
              {
                nowPath.indexOf('join') > -1 ? 
                      <Join history={history}></Join> : 
                      <Login history={history} indexUser={setUser}></Login>
              }                
              </>
            )
          }else{
            return(
              <>
                <Header mode={themeStats.themeState} history={history}></Header>
                  <Content history={history} match={match}></Content>
                <Footer></Footer>
              </>
            )
          }
        })(loginData)
      }

    </div>
  );
}

export default App;
 