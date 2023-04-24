import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

interface IsignUp {
  isLogin?: boolean;
}

const SignUpForm = ({ isLogin }: IsignUp) => {
  const router = useRouter();
  const { signUp, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      signUp(formData.name, formData.email, formData.password);
    } else {
      login(formData.email, formData.password);
    }
    router.push('/budget');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-sm mx-auto my-4 p-4 bg-white rounded shadow-md'
    >
      {!isLogin ? (
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Name:
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full border border-gray-400 p-2 rounded'
          />
        </div>
      ) : null}
      <div className='mb-4'>
        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
          Email:
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full border border-gray-400 p-2 rounded'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='password'
          className='block text-gray-700 font-bold mb-2'
        >
          Password:
        </label>
        <input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
          className='w-full border border-gray-400 p-2 rounded'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
