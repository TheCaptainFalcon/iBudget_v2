export default(state = 0, action) => {
    switch(action.payload) {
        case 'FETCH_INC_TOTAL':
            return action.payload;
        default:
            return state;
    }
}