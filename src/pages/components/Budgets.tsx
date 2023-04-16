import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';

export default function Budgets() {
  const budgetContext = useContext(AppContext);
  return (
    <div className='bg-red-400	rounded w-96 p-2 pl-3'>
      <span className='text-slate-100	'>Budget: ${budgetContext?.budget}</span>
    </div>
  );
}
