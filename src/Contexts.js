import React from 'react';

export const ResultsContext = React.createContext();
export const ExpenseContext = React.createContext();
export const IncomeContext = React.createContext();
export const ExpenseFullContext = React.createContext();

export const ResultsProvider = ResultsContext.Provider;
export const ResultsConsumer = ResultsContext.Consumer;

export const ExpenseProvider = ExpenseContext.Provider;
export const ExpenseConsumer = ExpenseContext.Consumer;
export const ExpenseFullProvider = ExpenseFullContext.Provider
export const ExpenseFullConsumer = ExpenseFullContext.Consumer

export const IncomeProvider = IncomeContext.Provider;
export const IncomeConsumer = IncomeContext.Consumer;
