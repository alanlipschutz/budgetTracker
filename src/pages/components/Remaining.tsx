import { AppContext, useApp } from '@/context/AppContext';
import React, { useContext } from 'react';

export default function Remaining() {
  // const budgetContext = useContext(AppContext);
  const budgetContext = useApp();

  return (
    <div className='bg-green-400 rounded w-96 p-2 pl-3'>
      <span className='text-slate-100	'>
        Remaining: ${budgetContext?.budget.remaining}
      </span>
    </div>
  );
}
