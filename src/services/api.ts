import {
  BudgetState,
  Expense,
  LoginResponse,
  RegisterResponse,
  addBudget,
} from '@/globalTypes';
import axios from 'axios';

const API = 'http://localhost:8080';

const apiRoute = axios.create({
  baseURL: API,
  withCredentials: true,
});

async function addBudgetToAccount(budget: addBudget) {
  const { data } = await apiRoute.post('/budget', budget);
  return data;
}

async function getCurrentBudget() {
  const { data } = await apiRoute.get<BudgetState[]>('/');
  return data;
}

async function getMyBudget() {
  const { data } = await apiRoute.get<BudgetState>('/budget');
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

const login = async (
  email: string,
  password: string
): Promise<LoginResponse | undefined> => {
  try {
    const response = await apiRoute.post('/login', { email, password });
    if (response.status === 200) {
      return { success: true, user: response.data };
    }
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: 'Unable to login at this time. Please try again later.',
    };
  }
};

const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse | undefined> => {
  try {
    const response = await apiRoute.post('/register', {
      name,
      email,
      password,
    });
    if (response.status === 201) {
      return { success: true, user: response.data };
    }
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: 'Unable to register at this time. Please try again later.',
    };
  }
};

const logout = async () => {
  await apiRoute.post('/logout');
};

export {
  getCurrentBudget,
  getMyBudget,
  addExpenseToBudget,
  removeExpenseOfBudget,
  addBudgetToAccount,
  register,
  login,
  logout,
};
