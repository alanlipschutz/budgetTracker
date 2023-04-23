import { BudgetState, Expense, addBudget } from '@/globalTypes';
import { createContext, useState, useEffect } from 'react';
import {
  addBudgetToAccount,
  addExpenseToBudget,
  getCurrentBudget,
  removeExpenseOfBudget,
} from '@/services/api';

interface ContextValue extends BudgetState {
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  addBudget: (budget: addBudget) => void;
}

export const AppContext = createContext<ContextValue | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = (props: AppProviderProps) => {
  const [appState, setAppState] = useState<BudgetState>({
    budgetState: 3000,
    remaining: 3000,
    spent: 0,
    expenses: [],
  });

  async function addBudget(budget: addBudget) {
    try {
      const { newBalance } = await addBudgetToAccount(budget);
      setAppState(newBalance);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    async function getBudget() {
      try {
        const budgetData = await getCurrentBudget();
        setAppState(budgetData);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getBudget();
  }, []);

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
        budgetState: appState.budgetState,
        expenses: appState.expenses,
        spent: appState.spent,
        remaining: appState.remaining,
        addExpense: addExpense,
        removeExpense: removeExpense,
        addBudget: addBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
