import { BudgetState, Expense, addBudget } from '@/globalTypes';
import { createContext, useState, useEffect } from 'react';
import {
  addBudgetToAccount,
  addExpenseToBudget,
  getMyBudget,
  removeExpenseOfBudget,
} from '@/services/api';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

interface ContextValue {
  budget: BudgetState;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  addBudget: (budget: addBudget) => void;
}

export async function getStaticProps() {
  try {
    const budget = await getMyBudget();
    return {
      props: {
        budget,
      },
    };
  } catch (error: any) {
    console.log(error.message);
  }
}

export const AppContext = createContext<ContextValue | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
  budget: BudgetState;
};
export const AppProvider = (props: AppProviderProps) => {
  const [appState, setAppState] = useState<BudgetState>({
    budgetState: 3000,
    remaining: 3000,
    spent: 0,
    expenses: [],
    id: '1',
  });

  async function addBudget(budget: addBudget) {
    try {
      const { newBalance } = await addBudgetToAccount(budget);
      setAppState(newBalance);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function addExpense(expense: Expense) {
    try {
      const { newBudget } = await addExpenseToBudget(expense);
      console.log(newBudget);
      setAppState(newBudget);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function removeExpense(id: string) {
    try {
      const { newBudget } = await removeExpenseOfBudget(id);
      setAppState(newBudget);
    } catch (error: any) {
      error.message;
    }
  }

  return (
    <AppContext.Provider
      value={{
        budget: appState,
        addExpense: addExpense,
        removeExpense: removeExpense,
        addBudget: addBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
