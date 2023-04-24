import { AppProvider } from '@/context/AppContext';
import React, { useState } from 'react';
import SignUpForm from './components/Signup';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-200'>
      <motion.h1
        className='text-5xl font-bold mb-10'
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to budget!
      </motion.h1>
      <motion.div
        className='flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {isLogin ? (
          <SignUpForm isLogin={true} />
        ) : (
          <SignUpForm isLogin={false} />
        )}
        <button
          className='text-blue-500 mt-4 underline hover:text-blue-700 focus:outline-none'
          onClick={toggleForm}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Log in'}
        </button>
      </motion.div>
    </div>
  );
}
