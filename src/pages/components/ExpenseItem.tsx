import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';

type PropsExpenseItem = {
  id: string;
  name: string;
  cost: number;
};

export default function ExpenseItem(props: PropsExpenseItem) {
  const budgetContext = useContext(AppContext);

  function removeExpense() {
    budgetContext?.removeExpense(props.id);
  }

  return (
    <li className='flex justify-between items-center border border-slate-300 p-2'>
      {props.name}
      <div className='flex items-center gap-5'>
        <span className='bg-blue-500 rounded-xl p-2'>${props.cost}</span>
        <TiDelete
          onClick={removeExpense}
          className='cursor-pointer	'
          size='1.5em'
        ></TiDelete>
      </div>
    </li>
  );
}
