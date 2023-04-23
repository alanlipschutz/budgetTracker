import { Inter } from 'next/font/google';
import Budgets from './components/Budgets';
import Remaining from './components/Remaining';
import SpentSoFar from './components/SpentSoFar';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import Modal from '@mui/material/Modal';
import { Box, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import { FaPlus, FaDollarSign } from 'react-icons/fa';

import { AppContext, AppProvider } from '@/context/AppContext';
import AddBudgetForm from './components/AddBudgetForm';

const inter = Inter({ subsets: ['latin'] });

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [addBudget, setAddBudget] = useState<boolean>(false);

  const handleModal = (state: boolean) => {
    state ? setOpen(false) : setOpen(true);
  };

  const handleModalBudget = (state: boolean) => {
    state ? setAddBudget(false) : setAddBudget(true);
  };

  return (
    <AppProvider>
      <main className=' '>
        <header className='flex justify-end pr-3 pt-3'>
          <FaPlus
            onClick={() => handleModal(open)}
            size={'2rem'}
            className=''
          ></FaPlus>
        </header>
        <h1 className='text-4xl font-bold text-gray-900 text-center mt-10'>
          My Budget Planner
        </h1>
        <div className='flex justify-center mt-10 flex-wrap gap-4'>
          <div
            className='cursor-pointer'
            onClick={() => handleModalBudget(addBudget)}
          >
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
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <AddExpenseForm closeModal={setOpen} />
          </Box>
        </Modal>
        <Modal
          open={addBudget}
          onClose={handleModalBudget}
          aria-labelledby='modal-modal-setBudget'
          aria-describedby='modal-modal-setBudget'
        >
          <Box sx={style}>
            <AddBudgetForm closeModal={setAddBudget} />
          </Box>
        </Modal>
      </main>
    </AppProvider>
  );
}
