import { BudgetState, Expense, addBudget } from '@/globalTypes';
import { createContext, useState, useEffect, useContext } from 'react';
import {
  addBudgetToAccount,
  addExpenseToBudget,
  getMyBudget,
  removeExpenseOfBudget,
} from '@/services/api';
import { useAuth } from './AuthContext';

interface ContextValue {
  budget: BudgetState;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  addBudget: (budget: addBudget) => void;
  error: any;
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

export const AppContext = createContext<ContextValue>({
  addBudget: () => {},
  addExpense: () => {},
  removeExpense: () => {},
  budget: { budgetState: 0, expenses: [], id: '1', remaining: 0, spent: 0 },
  error: '',
});

export const useApp = () => useContext(AppContext);
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
  const [error, setError] = useState<string>('');
  const { authState } = useAuth();

  function clearError() {
    setTimeout(() => {
      setError('');
    }, 6000);
  }
  async function createBudget(budget: addBudget) {
    try {
      const { newBalance } = await addBudgetToAccount(budget);
      setAppState(newBalance);
    } catch (error: any) {
      setError(
        JSON.stringify(
          `${error.response.status} - ${error.response.statusText}-${error.response.data.message}`
        )
      );
      clearError();
      console.log(error.response.data.message);
    }
  }

  async function addExpense(expense: Expense) {
    try {
      const { newBudget } = await addExpenseToBudget(expense);
      console.log(newBudget);
      setAppState(newBudget);
    } catch (error: any) {
      setError(
        JSON.stringify(
          `${error.response.status} - ${error.response.statusText}-${error.response.data.message}`
        )
      );
      clearError();
      console.log(error.message);
    }
  }

  async function removeExpense(id: string) {
    try {
      const { newBudget } = await removeExpenseOfBudget(id);
      setAppState(newBudget);
    } catch (error: any) {
      setError(
        JSON.stringify(
          `${error.response.status} - ${error.response.statusText}-${error.response.data.message}`
        )
      );
      clearError();
      console.log(error.message);
    }
  }

  async function handleGetMyBudget() {
    try {
      const budget = await getMyBudget();
      setAppState(budget);
    } catch (error: any) {
      setError(
        JSON.stringify(
          `${error.response.status} - ${error.response.statusText}-${error.response.data.message}`
        )
      );
      clearError();
    }
  }
  useEffect(() => {
    if (authState.user?.token) {
      handleGetMyBudget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <AppContext.Provider
      value={{
        budget: appState,
        addExpense: addExpense,
        removeExpense: removeExpense,
        addBudget: createBudget,
        error: error,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
