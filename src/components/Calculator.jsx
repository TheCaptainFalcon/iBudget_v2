import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expense : [
                { name : '', value: 0 }
            ],
            income : [
                { name : '', value : 0 }
            ],  
            expenseTotal: 0,
            incomeTotal: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitExpense = this.submitExpense.bind(this);
        this.submitIncome = this.submitIncome.bind(this);
        this.addExpenseForm = this.addExpenseForm.bind(this);
    }

    // Expense-related

    addExpenseForm() {
        this.setState(prevState => ({
            expense : [...prevState.expense, 
                { name : '', value : 0 }
            ]
        }));
        // Add styled component of duplicate form for easier reusability
        // or place the form into a util folder and import here for both
    };

    submitExpense(e) {
        e.preventDefault();
        this.setState({
            
        });
    };

    submitIncome(e) {
        e.preventDefault();
        this.setState({
            
        });
    };

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() { 
        return (  
            <div>
                This is the calculator component

                <form onSubmit={this.submitExpense}>
                    <label/>Name of Expense
                    <input 
                        name='expenseName'
                        type='text'
                        placeholder='Name of expense'
                        onChange={this.handleChange}
                        value={this.state.expenseName}
                    />
                    <label/>Expense Amount
                    <input 
                        name='expenseValue'
                        type='text'
                        placeholder='Cost of expense'
                        onChange={this.handleChange}
                        value={this.state.expenseValue}
                    />

                    <button onClick={this.addExpenseForm}>+</button>

                    <input
                    type='submit'
                    />
                </form>
                <form onSubmit={this.submitIncome}>
                    <label/>Name of Income
                    <input 
                        name='incomeName'
                        type='text'
                        placeholder='Name of Income'
                        onChange={this.handleChange}
                        value={this.state.incomeName}
                    />
                    <label/>Income Amount
                    <input 
                        name='incomeValue'
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