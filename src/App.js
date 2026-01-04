import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile';
import ModifiedProfile from './pages/ModifiedProfile';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/update/:id" element={<ModifiedProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
