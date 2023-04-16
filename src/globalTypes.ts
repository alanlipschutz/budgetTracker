export type Expense = {
  id: string;
  name: string;
  cost: number;
};

export interface BudgetState {
  budget: number;
  remaining: number;
  spent: number;
  expenses: Expense[];
}
