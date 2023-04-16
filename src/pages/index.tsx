import { Inter } from 'next/font/google';
import Budgets from './components/Budgets';
import Remaining from './components/Remaining';
import SpentSoFar from './components/SpentSoFar';
import ExpenseList from './components/ExpenseList';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className=' '>
      <h1 className='text-4xl font-bold text-gray-900 text-center mt-10'>
        My Budget Planner
      </h1>
      <div className='flex justify-center mt-10 flex-wrap gap-4'>
        <div className=''>
          <Budgets />
        </div>
        <div className=''>
          <Remaining />
        </div>
        <div className=''>
          <SpentSoFar />
        </div>
      </div>
      <h3 className='mt-3'>Expenses</h3>
      <div className='mt-3'>
        <ExpenseList />
      </div>
    </main>
  );
}
