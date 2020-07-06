export default (state = [], action) => {
    switch(action.payload) {
        case 'FETCH_INC_NAMES':
            return action.payload;
        default:
            return state;
    }
}