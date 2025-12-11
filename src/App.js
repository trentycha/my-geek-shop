import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import UserList from './pages/UserList.js';
import Header from './components/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
