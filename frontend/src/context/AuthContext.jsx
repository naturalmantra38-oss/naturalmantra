import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nm_token') || '');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nm_user');
    if (savedUser && token) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsAdmin(parsed.role === 'ADMIN');
      } catch (err) {
        console.error('Failed to parse saved user credentials', err);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    // Check admin hardcoded / seed mock login
    if (email === 'admin@naturalmantra.com' && (password === 'Admin@123456' || password === 'admin123')) {
      const adminUser = {
        _id: 'admin_1',
        name: 'Natural Mantra Admin',
        email: 'admin@naturalmantra.com',
        role: 'ADMIN'
      };
      const mockToken = 'mock_jwt_admin_token_' + Date.now();
      setUser(adminUser);
      setToken(mockToken);
      setIsAdmin(true);
      localStorage.setItem('nm_user', JSON.stringify(adminUser));
      localStorage.setItem('nm_token', mockToken);
      return { success: true, user: adminUser };
    }

    // Customer login mock or API
    const customerUser = {
      _id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'CUSTOMER'
    };
    const mockToken = 'mock_jwt_customer_token_' + Date.now();
    setUser(customerUser);
    setToken(mockToken);
    setIsAdmin(false);
    localStorage.setItem('nm_user', JSON.stringify(customerUser));
    localStorage.setItem('nm_token', mockToken);
    return { success: true, user: customerUser };
  };

  const register = async (name, email, password, phone) => {
    const newUser = {
      _id: 'usr_' + Date.now(),
      name,
      email,
      phone,
      role: 'CUSTOMER'
    };
    const mockToken = 'mock_jwt_customer_token_' + Date.now();
    setUser(newUser);
    setToken(mockToken);
    setIsAdmin(false);
    localStorage.setItem('nm_user', JSON.stringify(newUser));
    localStorage.setItem('nm_token', mockToken);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setIsAdmin(false);
    localStorage.removeItem('nm_user');
    localStorage.removeItem('nm_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
