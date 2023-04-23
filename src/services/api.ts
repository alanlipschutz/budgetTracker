import { BudgetState, Expense, addBudget } from '@/globalTypes';
import axios from 'axios';

const API = 'http://localhost:8080';

const apiRoute = axios.create({
  baseURL: API,
});

async function addBudgetToAccount(budget: addBudget) {
  const { data } = await apiRoute.post('/budget', budget);
  return data;
}

async function getCurrentBudget() {
  const { data } = await apiRoute.get<BudgetState>('/');
  return data;
}

async function addExpenseToBudget(expense: Expense) {
  const { data } = await apiRoute.post('/', expense);
  return data;
}

async function removeExpenseOfBudget(id: string) {
  const { data } = await apiRoute.delete(`/${id}`);
  return data;
}

export {
  getCurrentBudget,
  addExpenseToBudget,
  removeExpenseOfBudget,
  addBudgetToAccount,
};
