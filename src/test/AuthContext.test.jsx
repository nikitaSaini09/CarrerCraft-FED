import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock API
vi.mock('../utils/api', () => ({
  authAPI: {
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
  },
}));

// Test component that uses auth context
const TestComponent = () => {
  const { user, login, signup, logout, loading, error } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? user.email : 'No user'}</div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not loading'}</div>
      <div data-testid="error">{error || 'No error'}</div>
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button onClick={() => signup({ email: 'test@example.com', password: 'password', name: 'Test User' })}>
        Signup
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithAuth = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide initial auth state', () => {
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
    expect(screen.getByTestId('error')).toHaveTextContent('No error');
  });

  it('should handle successful login', async () => {
    const { authAPI } = await import('../utils/api');
    authAPI.login.mockResolvedValue({
      success: true,
      token: 'mock-token',
      user: { email: 'test@example.com', name: 'Test User' }
    });

    renderWithAuth(<TestComponent />);
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });
  });

  it('should handle login error', async () => {
    const { authAPI } = await import('../utils/api');
    authAPI.login.mockRejectedValue(new Error('Login failed'));

    renderWithAuth(<TestComponent />);
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Login failed');
    });
  });

  it('should handle logout', async () => {
    const { authAPI } = await import('../utils/api');
    authAPI.login.mockResolvedValue({
      success: true,
      token: 'mock-token',
      user: { email: 'test@example.com', name: 'Test User' }
    });

    renderWithAuth(<TestComponent />);
    
    // Login first
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });
    
    // Then logout
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
    });
  });
});
