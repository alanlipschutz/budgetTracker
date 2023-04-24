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
  id: string;
}

export interface addBudget {
  budget: number;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    name: string;
    email: string;
    token: string;
    id: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    name: string;
    email: string;
    token: string;
    id: string;
  };
}
