import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ResultsProvider, ExpenseProvider, IncomeProvider, ExpenseFullProvider } from '../Contexts';
import Results from './Results';
import { Tooltip, OverlayTrigger, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDollarSign, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import './css/Calculator.css'

const FormButtonContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 3rem;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const CalcTitle = styled.h1`
    display: flex;
    justify-content: center;
    border: 1px solid black;
    border-radius: 20px;
    margin-bottom: 1rem;
    box-shadow: 1px 1px 1px gray;
`;

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
            convertedExpenseValueBank : [],
            expenseTotal : [],
            // inc
            incomeNameBank : [],
            incomeValueBank : [],
            incomeTotal : [],
            // else
            budgetTotal : [],
            showResults: false,
            // modal
            submitModal: false,
            resetModal: false,
            // checkbox
            isChecked : false
        
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

        // Conditional Context Results
        this.showSubmitResults = this.showSubmitResults.bind(this);

        // Modal
        this.showSubmitModal = this.showSubmitModal.bind(this);
        this.showResetModal = this.showResetModal.bind(this);
        this.hideSubmitModal = this.hideSubmitModal.bind(this);
        this.hideResetModal = this.hideResetModal.bind(this);
        
        // Checkbox
        this.checkboxChange = this.checkboxChange.bind(this);
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
                
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:'2rem' }}>
                    {/* Name */}
                    <FontAwesomeIcon icon={faUser} style={{ margin: '0.5rem 0.5rem auto auto' }}/>
                    <input 
                        // name must match associated state -- see notes
                        name='name'
                        type='text'
                        placeholder='Name'
                        // must bind here, because of new instances of i,
                        // cannot be recognized near the constructor due to scope
                        onChange={this.expenseChanges.bind(this, i)}
                        value={e.name}
                        required
                    />
                    {/* Amount */}
                    <FontAwesomeIcon icon={faDollarSign} style={{ margin:'0.5rem 0.5rem auto 1rem' }}/>
                    <input 
                        name='value'
                        type='text'
                        placeholder='Amount'
                        onChange={this.expenseChanges.bind(this, i)}
                        value={e.value}
                        required
                    />
                  
                    {/* Delete X */}
                    <input
                        name='delExpForm'
                        type='button'
                        value='X'
                        onClick={this.deleteExpense.bind(this, i)}
                        style={{ border:'none', color:'red', outline:'none', fontWeight:'500', marginLeft:'0.5rem' }}
                    />
                    </div>
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
                { name : '', value : '', }
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

                <div style={{ display:'flex', justifyContent:'space-between', marginTop:'2rem' }}>

                    {/* Name */}
                    <FontAwesomeIcon icon={faUser} style={{ margin: '0.5rem 0.5rem auto auto' }}/>
                    <input 
                    
                        // name must match associated state -- see notes
                        name='name'
                        type='text'
                        placeholder='Name'
                        // must bind here, because of new instances of i,
                        // cannot be recognized near the constructor due to scope
                        onChange={this.incomeChanges.bind(this, i)}
                        value={e.name}
                        required
                    />
                    {/* Amount */}
                    <FontAwesomeIcon icon={faDollarSign} style={{ margin:'0.5rem 0.5rem auto 1rem' }}/>
                    <input 
                        name='value'
                        type='text'
                        placeholder='Amount'
                        onChange={this.incomeChanges.bind(this, i)}
                        value={e.value}
                        required
                    />
                    
                    {/* Delete form button */}
                    <input
                        name='delIncomeForm'
                        type='button'
                        value='X'
                        onClick={this.deleteIncome.bind(this, i)}
                        style={{ border:'none', color:'red', outline:'none', fontWeight:'500', marginLeft:'0.5rem' }}
                    />
                </div>
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


        // for(let i = 0; i <= this.state.expense.length; i++) {
        // if(this.state.expense[i].freq === 'daily') {
        //     console.log(_.toNumber(this.state.expense[i].value) * 30 )   
        // } 
        // }

        let convertedExpenseValueAccumulator = this.state.expense.find(obj => {
        
           
            if (obj.freq = 'daily') {
                return _.toNumber(obj.value * 1)
            } else if (obj.freq = 'weekly') {
                return _.toNumber(obj.value * 4)
            } else if (obj.freq = 'bi-weekly') {
                return _.toNumber(obj.value * 2) 
            } else if (obj.freq = 'monthly') {
               return _.toNumber(obj.value * 1)
            } else if (obj.freq = 'annual') {
                return _.toNumber(obj.value / 12)
            }         
        })

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
            convertedExpenseValueBank : convertedExpenseValueAccumulator,
            incomeNameBank : incomeNameAccumulator,
            incomeValueBank : incomeValueAccumulator,
            expenseTotal : expenseTotalAdder,
            incomeTotal : incomeTotalAdder,
            budgetTotal : budgetTotalCalc,
            submitModal : true,
            showSubmitResults : true
        })
    };

    resetTab() {
        this.setState({
            expense : [
                { name : '', value : '' }
            ],
            income : [
                { name : '', value: '' }
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
            budgetTotal : [],
            showSubmitResults: false,
            // modal
            resetModal : false,
            // checkbox
            isChecked : false
        });
    };

    // Context Results
    

    showSubmitResults(e) {
        e.preventDefault();
        this.setState({
            showResults: true
        });
    };

    // Modal
    showSubmitModal(e) {
        e.preventDefault();
        this.setState({
            submitModal : true
        });
    };

    hideSubmitModal(e) {
        e.preventDefault();
        this.setState({
            submitModal : false
        });
    };

    showResetModal(e) {
        e.preventDefault();
        this.setState({
            resetModal : true
        });
    };

    hideResetModal(e) {
        e.preventDefault();
        this.setState({
            resetModal : false
        });
    };

    // checkbox
    checkboxChange() {
        this.setState({
            isChecked : !this.state.isChecked
        })
    }

    render() { 

        function renderTooltip(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                Applying this will take into consideration leap and non-leap years and average the values per frequency basis.
                </Tooltip>
            );
            }
            
        const StrictHover = () => (
            <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
            >
                <sup
                    style={{ color: 'blue', fontSize: 'x-small', marginLeft:'0.25rem'}}   
                >What is this?
                </sup>
            </OverlayTrigger>
            );
            
        const expense = this.state.expense;
        const income = this.state.income;
        const expenseNameBank = this.state.expenseNameBank;
        const expenseValueBank = this.state.expenseValueBank;
        const expenseTotal = this.state.expenseTotal;
        const incomeNameBank = this.state.incomeNameBank;
        const incomeValueBank = this.state.incomeValueBank;
        const incomeTotal = this.state.incomeTotal;
        const budgetTotal = this.state.budgetTotal;

        // // weirdly enough this doesn't work with button routing logic
        // const clickedInvestments = this.state.clickedInvestments;
        // const clickedResults = this.state.clickedInvestments;

        return (  
            <div>

               <Wrapper>
                <form onSubmit={this.calculateResults}>  
                
                    <CalcTitle>Budget Calculations</CalcTitle>

                    <input
                        id='strictFormula'
                        type='checkbox'
                        onChange={this.checkboxChange}
                        style={{ marginRight:'0.35rem' }}
                    />
                    <label htmlFor='strictFormula'>Strict Method</label>
                    <StrictHover/>


                    <h2 style={{ display: 'flex', justifyContent:'center'}}> 
                        Expense 
                        <input 
                            type='button'
                            onClick={this.addExpenseState}
                            value='+'
                            style={{ marginLeft:'1rem', color: 'green', border:'none', outline:'none' }}
                        />
                    </h2>

                    {this.addExpenseForm()}

                    <h2 style={{ display: 'flex', justifyContent:'center', marginTop:'1.5rem'}}>
                        Income
                        <input
                            type='button'
                            onClick={this.addIncomeState}
                            value='+'
                            style={{ marginLeft:'1rem', color: 'green', border:'none', outline:'none' }}
                        />
                    </h2>

                    {this.addIncomeForm()}

                    <FormButtonContainer>
                        <input 
                            type='submit'
                            style={{ border:'1px solid black', borderRadius:'20px', marginLeft: '1rem', marginRight: '1rem' }}
                        />
                        <input 
                            type='button' 
                            value='Reset'
                            style={{ border:'1px solid black', borderRadius:'20px' }}
                            onClick={this.showResetModal} 
                        />
                    </FormButtonContainer>

                    {/* Results Component */}
                    {this.state.showSubmitResults ?

                            <ExpenseFullProvider value={expense}>
                          <ResultsProvider value={budgetTotal}>
                            <ExpenseProvider value={expenseTotal}>
                            <IncomeProvider value={incomeTotal}>
                                <CalcTitle>Results Analysis</CalcTitle>
                                <Results/>
                            </IncomeProvider>
                            </ExpenseProvider>
                            </ResultsProvider>  
                            </ExpenseFullProvider>
                        
                    : null }

                    {this.state.submitModal ?  
                
                    <Modal show={this.showSubmitModal} onHide={this.hideSubmitModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Data Submitted!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>The Results Analysis Section has now been populated below.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.hideSubmitModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    : null } 

                    {this.state.resetModal ?  
                
                    <Modal show={this.showResetModal} onHide={this.hideResetModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Confirming will delete all existing data!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.resetTab}>
                                Confirm <FontAwesomeIcon icon={faCheck}/>
                            </Button>
                            <Button variant="danger" onClick={this.hideResetModal}>
                                Go Back <FontAwesomeIcon icon={faBan}/>
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    : null } 

                </form>
            </Wrapper>
            </div> 
        )
    }
}
 
export default Calculator;