export type Expense = {
  id: string;
  name: string;
  cost: number;
};

export interface BudgetState {
  budgetState: number;
  remaining: number;
  spent: number;
  expenses: Expense[];
}

export interface addBudget {
  budget: number;
}
