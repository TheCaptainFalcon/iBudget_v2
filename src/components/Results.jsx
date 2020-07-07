import React, { Component } from 'react';
import {ResultsConsumer, ExpenseConsumer, IncomeConsumer} from '../Contexts';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            
        }
    }

    render() { 

        return (
            <div>
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