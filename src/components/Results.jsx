import React, { Component } from 'react';
import {ResultsConsumer, ExpenseConsumer, IncomeConsumer} from '../Contexts';
import Calculator from './Calculator';
import Investments from './Investments';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            clickedCalculator : false,
            clickedInvestment : false
        }
        this.clickerCalculator = this.clickerCalculator.bind(this);
        this.clickerInvestments = this.clickerInvestments.bind(this);
    }

clickerCalculator(e) {
    e.preventDefault();
    this.setState({
        clickedCalculator : true,
        clickedInvestment : false,
    });
};

clickerInvestments(e) {
    e.preventDefault();
    this.setState({
        clickedInvestment : true,
        clickedCalculator : false
    })
}

    render() { 
        
        if (this.state.clickedCalculator === true && this.state.clickedInvestment === false) {
            return <Calculator/>
        } else if (this.state.clickedInvestment === true && this.state.clickedCalculator === false) {
            return <Investments/>
        }

        return (
            <div>
            <button type='submit' onClick={this.clickerCalculator}>Calculator</button>
            <button type='submit' onClick={this.clickerInvestments}>Investments</button>

            <ResultsConsumer>
                {budgetTotal =>   
                <div>
                    Budget Amount: {budgetTotal}
                </div>
                }
            </ResultsConsumer>
            <ExpenseConsumer>
                {expenseTotal =>
                <div>
                    Expense Amount: {expenseTotal}
                </div>
                }
            </ExpenseConsumer>
            <IncomeConsumer>
                {incomeTotal =>
                <div>
                    Income Amount: {incomeTotal}    
                </div>
                }
            </IncomeConsumer>
            </div>
        )
    }
}
 
export default Results;