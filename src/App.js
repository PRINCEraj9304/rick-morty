
import './App.css';
import Header from './component/Header';
import Character from './component/Characters';
import { useState } from 'react';
import Characters from './component/Characters';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CharacterDetail from './pages/CharacterDetail';

function App() {

  const [text, setText] = useState('');

  return (

    <Router>
      <div className="App">

        <Header setText={setText} />
        <Routes>
          <Route path="/" element={<Characters text={text} />}></Route>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
