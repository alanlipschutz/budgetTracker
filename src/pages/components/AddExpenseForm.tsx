import { AppContext } from '@/context/AppContext';
import { Expense } from '@/globalTypes';
import React, { useState, useContext } from 'react';
import { uuid } from 'uuidv4';

type ExpenseFormProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddExpenseForm({ closeModal }: ExpenseFormProps) {
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  const budgetContext = useContext(AppContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense: Expense = {
      id: uuid(),
      name: name,
      cost: +cost,
    };
    budgetContext?.addExpense(newExpense);
    closeModal(false);
  };
  return (
    <form className='w-full max-w-lg' onSubmit={handleSubmit}>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-name'
          >
            Name
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-name'
            type='text'
            placeholder='supermarket'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-cost'
          >
            Cost
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-cost'
            type='number'
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full px-3'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
