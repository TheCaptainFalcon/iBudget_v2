import React from 'react';

const ResultsContext = React.createContext();

export const ResultsProvider = ResultsContext.Provider;
export const ResultsConsumer = ResultsContext.Consumer;

export default ResultsContext;