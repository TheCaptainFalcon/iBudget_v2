export default (state = [], action) => {
    switch(action.payload) {
        case 'FETCH_EXP_NAMES':
            return action.payload;
        default:
            return state;
    }
}
