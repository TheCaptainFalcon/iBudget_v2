import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ResultsProvider } from '../ResultsContext';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expense : [
                // value is best left as string rather than 0,
                // otherwise it adds onto the 0 + 'entry' and 
                // UX is a pain, having to manually delete before entry
                { name : '', value: '' }
            ],
            income : [
                { name : '', value : '' }
            ],
            // exp
            expenseNameBank : [],
            expenseValueBank : [],  
            expenseTotal : [],
            // inc
            incomeNameBank : [],
            incomeValueBank : [],
            incomeTotal : [],
            // else
            budgetTotal : []
        }
        
        // Expense-related
        this.addExpenseForm = this.addExpenseForm.bind(this);
        this.addExpenseState = this.addExpenseState.bind(this);

        // Income-related
        this.addIncomeForm = this.addIncomeForm.bind(this);
        this.addIncomeState = this.addIncomeState.bind(this);

        // Else
        this.calculateResults = this.calculateResults.bind(this);
        this.resetTab = this.resetTab.bind(this);
        // this.purgeEverything = this.purgeEverything.bind(this);

    }

    // Expense-related

    // function by itself - returns new instances of state
    // but since the form function maps the state, the former function
    // automatically links up and adds a new form and state
    addExpenseState() {
        this.setState(prevState => ({
            expense : [...prevState.expense, 
                { name : '', value : '' }
            ]
        }));
    };

    deleteExpense(i) {
        let expense = [...this.state.expense];
        expense.splice(i, 1);
        this.setState({ expense });
    };

    addExpenseForm() {
        return this.state.expense.map((e, i) => (
            <div key={i}>
                {/* Delete form button */}
                <input
                    name='delExpForm'
                    type='button'
                    value='X'
                    onClick={this.deleteExpense.bind(this, i)}
                />
                <div>Entry #{i}</div>
                <label/>Name of Expense
                    <input 
                        // name must match associated state -- see notes
                        name='name'
                        type='text'
                        placeholder='Name of expense'
                        // must bind here, because of new instances of i,
                        // cannot be recognized near the constructor due to scope
                        onChange={this.expenseChanges.bind(this, i)}
                        value={e.name}
                        // required
                    />
                    <label/>Expense Amount
                    <input 
                        name='value'
                        type='text'
                        placeholder='Cost of expense'
                        onChange={this.expenseChanges.bind(this, i)}
                        value={e.value}
                        // required
                    />
            </div>
        ))
    }

    expenseChanges(i, e) {
        let expense = [...this.state.expense];
        expense[i] = {...expense[i], [e.target.name] : e.target.value};
        this.setState({ expense });
    };

    // Income-related

    addIncomeState() {
        this.setState(prevState => ({
            income : [...prevState.income, 
                { name : '', value : '' }
            ]
        }));
    };

    deleteIncome(i) {
        let income = [...this.state.income];
        income.splice(i, 1);
        this.setState({ income });
    };

    addIncomeForm() {
        return this.state.income.map((e, i) => (
            <div key={i}>
                {/* Delete form button */}
                <input
                    name='delIncomeForm'
                    type='button'
                    value='X'
                    onClick={this.deleteIncome.bind(this, i)}
                />
                <div>Entry #{i}</div>
                <label/>Name of Income
                    <input 
                        // name must match associated state -- see notes
                        name='name'
                        type='text'
                        placeholder='Name of Income'
                        // must bind here, because of new instances of i,
                        // cannot be recognized near the constructor due to scope
                        onChange={this.incomeChanges.bind(this, i)}
                        value={e.name}
                        // required
                    />
                    <label/>Income Amount
                    <input 
                        name='value'
                        type='text'
                        placeholder='Income Amount'
                        onChange={this.incomeChanges.bind(this, i)}
                        value={e.value}
                        // required
                    />
            </div>
        ))
    }

    incomeChanges(i, e) {
        let income = [...this.state.income];
        income[i] = {...income[i], [e.target.name] : e.target.value};
        this.setState({ income });
    };

    // Calculate/Reset/Purge Button

    calculateResults(e) {
        e.preventDefault();

        const expenseNameAccumulator = this.state.expense.map(obj => {
            return obj.name
        });

        const expenseValueAccumulator = this.state.expense.map(obj => {
            return _.toNumber(obj.value)
        });

        const incomeNameAccumulator = this.state.income.map(obj => {
            return obj.name
        });

        const incomeValueAccumulator = this.state.income.map(obj => {
            return _.toNumber(obj.value)
        });

        // Swapped to vanilla reduce to use initialValue parameter for use in array of objects (+ parseFloat bc array of strings)
        // otherwise the result would be NaN; attempting to add object to number property
        // also had to switch state to reduce, because there is no initial value that's set until 
        // after the function is run, which is asynchronous, so it would still be empty until the second
        // rerun of the same function 

       const expenseTotalAdder = (this.state.expense.reduce((a, b) => 
        a + parseFloat(b.value), 0)
       )
       const incomeTotalAdder = (this.state.income.reduce((a, b) => 
        a + parseFloat(b.value), 0)
       )

        const budgetTotalCalc = incomeTotalAdder - expenseTotalAdder;

        this.setState({
            expenseNameBank : expenseNameAccumulator,
            expenseValueBank : expenseValueAccumulator,
            incomeNameBank : incomeNameAccumulator,
            incomeValueBank : incomeValueAccumulator,
            expenseTotal : expenseTotalAdder,
            incomeTotal : incomeTotalAdder,
            budgetTotal : budgetTotalCalc
        })
    };

    resetTab() {
        this.setState({
            expense : [
                { name : '', value : ''}
            ],
            income : [
                { name : '', value: ''}
            ],
            // exp
            expenseNameBank : [],
            expenseValueBank : [],  
            expenseTotal : [],
            // inc
            incomeNameBank : [],
            incomeValueBank : [],
            incomeTotal : [],
            // else
            budgetTotal : []
        });
    };

    render() { 
        return (  
           <ResultsProvider value={this.state.expenseTotal}> 
            <div>
                This is the calculator component
               
                <form onSubmit={this.calculateResults}>  
                
                    <input 
                        type='button'
                        onClick={this.addExpenseState}
                        value='+'
                    />

                    {this.addExpenseForm()}

                    <input
                        type='button'
                        onClick={this.addIncomeState}
                        value='+'
                    />

                    {this.addIncomeForm()}

                    <input type='submit'/>
                    <input 
                        type='button' 
                        value='Reset'
                        onClick={this.resetTab} 
                    />

                </form>

            </div>
            </ResultsProvider>
        );
    }
}
 
export default Calculator;