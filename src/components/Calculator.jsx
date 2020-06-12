import React, { Component } from 'react';
import styled from 'styled-components';

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
            expenseNameBank : [],
            expenseValueBank : [],  
            incomeNameBank : [],
            incomeValueBank : []
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
                        required
                    />
                    <label/>Expense Amount
                    <input 
                        name='value'
                        type='text'
                        placeholder='Cost of expense'
                        onChange={this.expenseChanges.bind(this, i)}
                        value={e.value}
                        required
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
                        required
                    />
                    <label/>Income Amount
                    <input 
                        name='value'
                        type='text'
                        placeholder='Income Amount'
                        onChange={this.incomeChanges.bind(this, i)}
                        value={e.value}
                        required
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
        this.setState({
            
        });
    };

    resetTab() {
        this.setState({
            expense : [
                { name : '', value : ''}
            ],
            income : [
                { name : '', value: ''}
            ],
            expenseTotal : '',
            incomeTotal : ''
        });
    };

    purgeEverything() {
        // reset state and add in clear localStorage.
    }

    render() { 
        return (  
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
                        
                </form>

            </div>
        );
    }
}
 
export default Calculator;