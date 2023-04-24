import { AppContext } from '@/context/AppContext';
import { addBudget } from '@/globalTypes';
import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';

type BudgetFormProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddBudgetForm({ closeModal }: BudgetFormProps) {
  const [budget, setBudget] = useState<string>('');
  const budgetContext = useContext(AppContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBudget: addBudget = {
      budget: +budget,
    };
    budgetContext?.addBudget(newBudget);
    closeModal(false);
  };

  return (
    <form className='w-full max-w-lg' onSubmit={handleSubmit}>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-budget'
          >
            Insert Budget
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-name'
            type='text'
            placeholder='$3000'
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
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
