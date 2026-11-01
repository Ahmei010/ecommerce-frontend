import { useCallback, useEffect, useMemo, useState } from 'react';
import api, { getApiError } from '../services/api';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const refreshProfile = useCallback(async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data.data.user);
      setAuthError('');
      return response.data.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        setAuthError('');
      } else {
        setAuthError(getApiError(error));
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    api.get('/auth/profile')
      .then(({ data }) => {
        if (active) {
          setUser(data.data.user);
          setAuthError('');
        }
      })
      .catch((error) => {
        if (active && error.response?.status === 401) {
          setUser(null);
          setAuthError('');
        } else if (active) {
          setAuthError(getApiError(error));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    setUser(response.data.data.user);
    setAuthError('');
    return response.data.data.user;
  };

  const register = async (details) => {
    const response = await api.post('/auth/register', details);
    setUser(response.data.data.user);
    setAuthError('');
    return response.data.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
      setAuthError('');
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    authError,
    login,
    register,
    logout,
    refreshProfile,
  }), [user, loading, authError, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
