import logo from './logo.svg';
import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2>React Greetings</h2>
      <Greeting name="bro" />
      </header>
    </div>
  );
}

export default App;
