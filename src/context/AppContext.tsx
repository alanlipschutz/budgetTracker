import { BudgetState, Expense, addBudget } from '@/globalTypes';
import { createContext, useState, useEffect, useContext } from 'react';
import {
  addBudgetToAccount,
  addExpenseToBudget,
  getMyBudget,
  removeExpenseOfBudget,
} from '@/services/api';

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


export const useApp = () => useContext(AppContext)
type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = (props: AppProviderProps) => {
  const [appState, setAppState] = useState<BudgetState>({
    budgetState: 3000,
    remaining: 3000,
    spent: 0,
    expenses: [],
    id: '1',
  });

  async function createBudget(budget: addBudget) {
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

  useEffect(() => {
    async function handleGetMyBudget() {
      const budget = await getMyBudget();
      setAppState(budget);
    }

    handleGetMyBudget();
  }, []);

  return (
    <AppContext.Provider
      value={{
        budget: appState,
        addExpense: addExpense,
        removeExpense: removeExpense,
        addBudget: createBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
