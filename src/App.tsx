import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PokemonDetails } from './pages/PokemonDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Inicio</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:nameOrId" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;