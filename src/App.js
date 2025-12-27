import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Login />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
