import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Auth context
const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Dummy credentials
const DUMMY_EMAIL = 'test@test.com';
const DUMMY_PASSWORD = '123456';

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: userData });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_token');
      }
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Login function with dummy authentication
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check dummy credentials
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        const userData = {
          uid: 'dummy-user-123',
          email: DUMMY_EMAIL,
          displayName: 'Test User'
        };

        // Store in localStorage
        localStorage.setItem('auth_token', 'dummy-token-123');
        localStorage.setItem('user_data', JSON.stringify(userData));

        dispatch({ type: 'SET_USER', payload: userData });
        return { success: true, user: userData };
      } else {
        const errorMessage = 'Invalid email or password';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Signup function with dummy authentication
  const signup = async (email, password, displayName) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check dummy credentials (same as login)
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        const userData = {
          uid: 'dummy-user-123',
          email: DUMMY_EMAIL,
          displayName: displayName || 'Test User'
        };

        // Store in localStorage
        localStorage.setItem('auth_token', 'dummy-token-123');
        localStorage.setItem('user_data', JSON.stringify(userData));

        dispatch({ type: 'SET_USER', payload: userData });
        return { success: true, user: userData };
      } else {
        const errorMessage = 'Invalid email or password';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = 'Signup failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Update state
      dispatch({ type: 'LOGOUT' });
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user data
  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    dispatch({ type: 'SET_USER', payload: updatedUser });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
