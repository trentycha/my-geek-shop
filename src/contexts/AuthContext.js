import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import Loading from '../pages/Loading.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = authService.getUser();
    const isAuth = authService.isAuthenticated();
    
    if (storedUser && isAuth) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    authService.setToken(token);
    authService.setUser(userData);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};