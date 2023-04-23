import { BudgetState, Expense } from '@/globalTypes';
import { createContext, useState, useEffect } from 'react';
import {
  addExpenseToBudget,
  getCurrentBudget,
  removeExpenseOfBudget,
} from '@/services/api';

interface ContextValue extends BudgetState {
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
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

  function spentUntilnow(expenses: Expense[]) {
    return expenses.reduce((total, item) => (total += item.cost), 0);
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
        budgetState: appState.budgetState,
        expenses: appState.expenses,
        spent: appState.spent,
        remaining: appState.remaining,
        addExpense: addExpense,
        removeExpense: removeExpense,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
