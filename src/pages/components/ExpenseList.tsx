import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '@/context/AppContext';

export default function ExpenseList() {
  const budgetContext = useContext(AppContext);

  return (
    <ul className='max-w-screen-md mt-0 mx-auto'>
      {budgetContext?.budget.expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          name={expense.name}
          cost={expense.cost}
        />
      ))}
    </ul>
  );
}
