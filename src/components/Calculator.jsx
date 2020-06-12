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
            expenseTotal: 0,
            incomeTotal: 0
        }
        
        // Expense-related
        this.submitExpense = this.submitExpense.bind(this);
        this.addExpenseForm = this.addExpenseForm.bind(this);
        this.addExpenseState = this.addExpenseState.bind(this);

        // Income-related
        this.submitIncome = this.submitIncome.bind(this);

    }

    // Expense-related

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

    submitExpense(e) {
        e.preventDefault();
        this.setState({
            
        });
    };

    // Income-related

    addIncState() {
        this.setState(prevState => ({
            expense : [...prevState.expense, 
                { name : '', value : 0 }
            ]
        }));
    };

    submitIncome(e) {
        e.preventDefault();
        this.setState({
            
        });
    };

    render() { 
        return (  
            <div>
                This is the calculator component
               
                <form>  
                
                    <input 
                        type='button'
                        onClick={this.addExpenseState}
                        value='+'
                    />

                    {this.addExpenseForm()}

                    <input type='submit'/>

                </form>
                
                <form onSubmit={this.submitIncome}>
                    <label/>Name of Income
                    <input 
                        name='name'
                        type='text'
                        placeholder='Name of Income'
                        onChange={this.handleChange}
                        value={this.state.incomeName}
                    />
                    <label/>Income Amount
                    <input 
                        name='value'
                        type='text'
                        placeholder='Name of expense'
                        onChange={this.handleChange}
                        value={this.state.incomeValue}
                    />
                    <input
                    type='submit'
                    />
                </form>

            </div>
        );
    }
}
 
export default Calculator;