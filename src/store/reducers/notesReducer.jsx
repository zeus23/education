const initState = {
    admission: []
}

const notesReducer = (state = initState, action) => {

    switch (action.type) {
        case 'ADDED_SUCCESS':
            return{
                ...state,
                admissionStatus : "Notes Successfully added"
            }
        case 'ADD_ERROR':
            return{
                ...state,
                admissionStatus : "Error"
            }
        case 'DELETE_SUCCESS':
            return{
                ...state
            }
        case 'DELETE_FAILED':
            return{
                ...state
            }
        default:
            return state;
    }
}

export default notesReducer;