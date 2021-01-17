import logo from './logo.svg';
import './App.css';
import Header from './_include/header';
import Footer from './_include/footer';
import Content from './content/index';
import react, { useState } from 'react';

function App({history, match}) {

  let [mode, setMode] = useState('dark');
  
  const changeMode = (mode) => {
    setMode(mode === 'dark' ? 'primary' : 'dark');
  }

  console.log(match);

  return (
    <div className="App">
      <Header mode={mode} changeMode={changeMode} history={history}></Header>
      {
        ((window) => {
          console.warn(window);
          
        })(window)
      }
      <Content history={history} match={match}></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
