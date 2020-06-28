import React, { Component } from 'react';

class Investments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialAmount1 : '',  
            investAmount1 : '',
            avgAnnReturn1 : '',
            addContributions : '',
            contribFreq : '',
            compoundFreq : '',
            years1 : '',
            eval1 : '',
            
            initialAmount2 : '',
            investAmount2 : '',
            avgAnnReturn2 : '',
            years2 : '',
            eval2 : ''

            // May add a tab to contain more states for a target amount calc
            // use this two initial ones as a comparison between investing vs loan (in big purchase)
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.submitInvestAmount1 = this.submitInvestAmount1.bind(this);
    }

    submitInvestAmount1(e) {
        e.preventDefault();

        let inv = parseInt(this.state.investAmount1)
        console.log(inv)
        let ret = (parseInt(this.state.avgAnnReturn1)) / 100
        console.log(ret)
        let years1 = parseInt(this.state.years1)
        console.log(years1)
        
        let rawResults = inv * ret * years1
        let fullResults = (inv * ret * years1) + 100
        console.log(rawResults)
        console.log(fullResults)

        // Need logic for compounding-interest, recurring inv payments 

        this.setState({
            eval1: fullResults
        })

    }

    submitInvestAmount2(e) {
        e.preventDefault();

    }

    handleChanges(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    };



    render() { 
        return (  
            <div>
                <form onSubmit={this.submitInvestAmount1}>
                    <label/> Initial Amount 1
                    <input
                        name='initialAmount1'
                        type='number'
                        placeholder='Ex: $1000'
                        onChange={this.handleChanges}
                        value={this.state.initialAmount1}
                    />
                    <label/>Investment Amount 1
                    <input
                        name='investAmount1'
                        type='number'
                        placeholder='Ex: $500'
                        onChange={this.handleChanges}
                        value={this.state.investAmount1}
                    />
                    <label/> Average Annual Return 1
                    <input
                        name='avgAnnReturn1'
                        type='number'
                        placeholder='Ex: 7.65%'
                        onChange={this.handleChanges}
                        value={this.state.avgAnnReturn1}
                    />
                    <label/> Number of years
                    <input
                        name='years1'
                        type='number'
                        placeholder='Ex: 5'
                        onChange={this.handleChanges}
                        value={this.state.years1}
                    />
                    <input
                        type='submit'
                        value='Calculate'
                    />
                </form>
                <form>
                    <label/>Investment Amount 2
                    <input
                        name='investAmount2'
                        type='number'
                        onChange={this.handleChanges}
                        value={this.state.investAmount2}
                    />
                </form>

            </div>
        );
    }
}
 
export default Investments;