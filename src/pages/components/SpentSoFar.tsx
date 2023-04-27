import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';

export default function SpentSoFar() {
  const budgetContext = useContext(AppContext);

  return (
    <div className='bg-blue-400	rounded w-96 p-2 pl-3'>
      <span className='text-slate-100	'>
        Spent so far: ${budgetContext?.budget.spent}
      </span>
    </div>
  );
}
