import { BudgetState, Expense } from '@/globalTypes';
import { createContext, useState } from 'react';

interface ContextValue extends BudgetState {
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

export const AppContext = createContext<ContextValue | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = (props: AppProviderProps) => {
  const initialState = {
    budget: 3000,
    remaining: 3000,
    spent: 0,
    expenses: [
      { id: '12', name: 'shopping', cost: 40 },
      { id: '13', name: 'holiday', cost: 400 },
      { id: '14', name: 'car service', cost: 50 },
    ],
  };
  const [appState, setAppState] = useState<BudgetState>(initialState);

  function spentUntilnow(expenses: Expense[]) {
    return expenses.reduce((total, item) => (total += item.cost), 0);
  }

  function addExpense(expense: Expense) {
    const newState = { ...appState };
    newState.expenses.push(expense);
    const spent = spentUntilnow(newState.expenses);
    newState.spent = spent;
    newState.remaining = newState.budget - spent;
    setAppState(newState);
  }

  function removeExpense(id: string) {
    const newState = { ...appState };
    const filteredArray = newState.expenses.filter(
      (expense) => expense.id !== id
    );
    newState.expenses = filteredArray;
    const spent = spentUntilnow(newState.expenses);
    newState.spent = spent;
    newState.remaining = newState.budget - spent;
    setAppState(newState);
  }

  return (
    <AppContext.Provider
      value={{
        budget: appState.budget,
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
