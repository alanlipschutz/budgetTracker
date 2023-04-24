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

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (authState.isLoggedIn === true) {
      router.push('/budget');
    }
  }, [authState, router]);

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
        setAuthState({ isLoggedIn: true, user: { name, email, token, id } });
        router.push('/budget');
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  const handleLogin = async (email: string, password: string) => {
    try {
      const response: LoginResponse | undefined = await login(email, password);
      console.log(response);
      if (response && response.success === true) {
        const { name, email, token, id } = response.user!;
        setAuthState({ isLoggedIn: true, user: { name, email, token, id } });
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthState({ isLoggedIn: false, user: null });
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
