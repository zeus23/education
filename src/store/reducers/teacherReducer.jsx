const initState = {
    admission: []
}

const teacherReducer = (state = initState, action) => {

    switch (action.type) {
        case 'TEACHER_ADDED_SUCCESSFULLY':
            return{
                ...state,
                addStatus : "Successfully added"
            }
        case 'ERROR':
            return{
                ...state,
                addStatus : "Error"
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

export default teacherReducer;