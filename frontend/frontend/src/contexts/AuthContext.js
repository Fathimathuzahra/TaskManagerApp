import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        username,
        password
      });
      
      const { access, refresh } = response.data;
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
      
      // Get user info
      const userResponse = await axios.get('http://127.0.0.1:8000/api/auth/me/', {
        headers: { Authorization: `Bearer ${access}` }
      });
      
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  };

  const register = async (username, email, password, password2) => {
  try {
    console.log('Sending registration request...');
    
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
      username,
      email,
      password,
      password2
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration success:', response.data);
    
    // Auto login after registration
    return await login(username, password);
  } catch (error) {
    console.error('Registration error details:');
    console.error('Error object:', error);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
};
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};