import React from 'react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const expenses = [
    { id: 12, name: 'shopping', cost: 40 },
    { id: 13, name: 'holiday', cost: 400 },
    { id: 14, name: 'car service', cost: 50 },
  ];

  return (
    <ul className='max-w-screen-md mt-0 mx-auto'>
      {expenses.map((expense) => (
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
