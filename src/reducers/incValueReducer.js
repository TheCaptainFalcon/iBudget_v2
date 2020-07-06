export default(state = 0, action) => {
    switch(action.payload) {
        case 'FETCH_INC_VALUES':
            return action.payload;
        default:
            return state;
    }
}