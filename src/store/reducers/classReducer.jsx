const initState = {
    class:null
}

const classReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CLASS_ADDED':
            return{
                ...state,
                classStatus : "successfully added"
            }
        case 'CLASS_NOT_ADDED':
            return{
                ...state,
                classStatus : "ERROR"
            }
        case 'SUBJECT_ADDED':
            return{
                ...state,
                subStatus : "successfully added"
            }
        case 'SUBJECT_NOT_ADDED':
            return{
                ...state,
                subStatus : "ERROR"
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

export default classReducer;