import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      const refreshToken = Cookies.get('refreshToken');

      if (token) {
        try {
          // Verifica se o token está expirado
          const decoded = jwt.decode(token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired && refreshToken) {
            // Tenta renovar o token
            const newToken = await refreshAuthToken(refreshToken);
            if (newToken) {
              Cookies.set('token', newToken, { expires: 7 }); // 7 dias
              setUser(jwt.decode(newToken));
            } else {
              // Se não conseguir renovar, faz logout
              logout();
            }
          } else {
            setUser(decoded);
          }
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          logout();
        }
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
      return null;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token, { expires: 7 }); // 7 dias
        Cookies.set('refreshToken', data.refreshToken, { expires: 30 }); // 30 dias
        setUser(jwt.decode(data.token));
        return { success: true };
      }

      const error = await response.json();
      return { success: false, error: error.message };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 