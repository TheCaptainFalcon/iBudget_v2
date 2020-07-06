export default (state = 0, action) => {
    switch(action.payload) {
        case 'FETCH_BUDGET':
            return action.payload;
        default:
            return state;
    }
}