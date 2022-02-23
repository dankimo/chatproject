function ProcessReducer(state = {}, action) {
    switch (action.type) {
        case 'PROCESS':
            return {...action.payload};
        default:
            return state;
    }
}

export { ProcessReducer };