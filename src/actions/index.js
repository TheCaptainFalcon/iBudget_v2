export const fetchBudget = () => async(dispatch, getState) => {
    const response = await this.state.budgetTotal

    dispatch({
        type: 'FETCH_BUDGET',
        payload: response
    })
}