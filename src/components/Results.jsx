import React, { Component } from 'react';
import ResultsContext from '../ResultsContext';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static contextType = ResultsContext;

    render() { 
        const budgetTotal = this.context;
        return (  
            <div>
                <div>
                    Budget Amount: {budgetTotal}
                </div>
                <div>
                    Expense Total:
                </div>
                <div>
                    Income Total:
                </div>
            </div>
        );
    }
}
 
export default Results;