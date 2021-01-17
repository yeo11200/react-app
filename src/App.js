import logo from './logo.svg';
import './App.css';
import Header from './_include/header';
import Footer from './_include/footer';
import Content from './content/index';
import react, { useState } from 'react';
import { Login } from './content/Main';

function App({history, match}) {

  let [mode, setMode] = useState('dark');
  
  
  let [ user, setUser ] = useState({
      memId : sessionStorage.getItem('MEMBER_ID') ? sessionStorage.getItem('MEMBER_ID') : '',
  });

  let { memId } = user;


  const changeMode = (mode) => {
    setMode(mode === 'dark' ? 'primary' : 'dark');
  }

  console.log(match);

  return (
    <div className="App">
      {
        ((memId) => {
          if(memId === ''){
            return(
              <>
                <h2> 여러분들의 스케줄를 관리해주는 앱</h2>
                <Login history={history} indexUser={setUser}></Login>
              </>
            )
          }else{
            return(
              <>
                <Header mode={mode} changeMode={changeMode} history={history}></Header>
                {
                  ((window) => {
                    console.warn(window);
                    
                  })(window)
                }
                <Content history={history} match={match}></Content>
                <Footer></Footer>
              </>
            )
          }
        })(memId)
      }

    </div>
  );
}

export default App;
