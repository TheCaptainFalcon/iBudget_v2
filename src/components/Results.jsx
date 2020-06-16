import React, { Component } from 'react';
import ResultsContext from '../ResultsContext';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static contextType = ResultsContext;

    componentDidMount() {
        const expTotal = this.context;

        console.log(expTotal)
    }

    render() { 
        return (  
            <div>
                Results comp
                {this.expTotal}
            </div>
        );
    }
}
 
export default Results;