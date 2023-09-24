import BattlePage from './components/battle-page.js';
import logo from './logo.svg';
import './App.css';
import './styles/colors.css';
import io from 'socket.io-client';
import {useState} from 'react';



const socket = io.connect('http://localhost:4000');




function App() {

  const [n, setN] = useState(-1);

  socket.on("player-number", num => {
    console.log(num);
    setN(num);
  })
  return (
    <div className="App">
      <BattlePage />
      {n}
    </div>
  );
}

export default App;
