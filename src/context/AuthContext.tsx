import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { register, login, logout } from '../services/api';
import { LoginResponse, RegisterResponse } from '@/globalTypes';

type User = {
  name: string;
  email: string;
  token: string;
  id: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => void;
  logout: () => void;
  signUp: (name: string, email: string, password: string) => void;
  error: any;
};

const AuthContext = createContext<AuthContextType>({
  authState: { isLoggedIn: false, user: null },
  login: () => {},
  logout: () => {},
  signUp: () => {},
  error: '',
});

interface ChildrenProps {
  children: React.ReactNode;
}

export const useAuth = () => useContext(AuthContext);
let localStorageUser: string | null;
if (typeof window !== 'undefined') {
  localStorageUser = localStorage.getItem('user');
}
export const AuthProvider = ({ children }: ChildrenProps) => {
  const [authState, setAuthState] = useState<AuthState>(
    localStorageUser
      ? JSON.parse(localStorageUser)
      : {
          isLoggedIn: false,
          user: null,
        }
  );
  const [error, setError] = useState<string>('');
  const router = useRouter();

  function addUserToLocalStorage(user: AuthState) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  function removeUserFromLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }

  function clearError() {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response: RegisterResponse | undefined = await register(
        name,
        email,
        password
      );
      if (response && response.success) {
        const { name, email, token, id } = response.user!;
        const userState = {
          isLoggedIn: true,
          user: { name, email, token, id },
        };
        setAuthState(userState);
        addUserToLocalStorage(userState);
        if (userState.isLoggedIn === true) {
          router.push('/budget');
        }
      } else {
        console.log(response?.message);
        setError(JSON.stringify(response?.message));
        clearError();
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
      clearError();
      router.push('/');
    }
    return false;
  };
  const handleLogin = async (email: string, password: string) => {
    try {
      const response: LoginResponse | undefined = await login(email, password);
      if (response && response.success === true) {
        const { name, email, token, id } = response.user!;
        const userState = {
          isLoggedIn: true,
          user: { name, email, token, id },
        };
        setAuthState(userState);
        addUserToLocalStorage(userState);
        if (userState.isLoggedIn === true) {
          router.push('/budget');
        }
      } else {
        console.log(response?.message);
        setError(JSON.stringify(response?.message));
        clearError();
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
      clearError();
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthState({ isLoggedIn: false, user: null });
      removeUserFromLocalStorage();
      router.push('/');
    } catch (error: any) {
      console.log(error);
      setError(JSON.stringify(error?.message));
      clearError();
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login: handleLogin,
        logout: handleLogout,
        signUp: handleSignUp,
        error: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
