export interface Expenses {
  expenses: Array<Expense>
};

export interface Expense {
  name: string;
  accountNo: string;
  targetAmount: number;
  transactions: Array<ExpenseTransaction>;
  predictions: Array<ExpenseTransaction>;
}

export interface ExpenseTransaction {
  month: number;
  amount: number;
}
