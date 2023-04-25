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
};

const AuthContext = createContext<AuthContextType>({
  authState: { isLoggedIn: false, user: null },
  login: () => {},
  logout: () => {},
  signUp: () => {},
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
      }
    } catch (error) {
      console.log(error);
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
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthState({ isLoggedIn: false, user: null });
      removeUserFromLocalStorage();
      router.push('/');
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
