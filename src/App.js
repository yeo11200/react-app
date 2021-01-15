import logo from './logo.svg';
import './App.css';
import { Router, Route } from 'react-router';


function App({history}) {

  console.log(history);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      {
        ((window) => {
          console.warn(window);
          
        })(window)
      }
      <Router>
        <Route path="/1234" component={() => { console.log(1234); }}></Route>
      </Router>
    </div>
  );
}

export default App;
