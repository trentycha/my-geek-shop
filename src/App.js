import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Header from './components/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
