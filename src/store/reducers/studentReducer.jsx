const initState = {
    admission: []
}

const studentReducer = (state = initState, action) => {

    switch (action.type) {
        case 'ADMISSION_SUCCESS':
            return{
                ...state,
                admissionStatus : "Successfully added"
            }
        case 'ADMISSION_ERROR':
            return{
                ...state,
                admissionStatus : "Error"
            }
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                editStatus:'Profile Updated'
            }

        case 'UPDATE_FAILED':
            return {
                ...state,
                editStatus:'Profile not updated'
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

export default studentReducer;