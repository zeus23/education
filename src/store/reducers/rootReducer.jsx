import { combineReducers } from "redux";
import authReducer from './authReducer';
import classReducer from './classReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import studentReducer from "./studentReducer";
import teacherReducer from './teacherReducer';
import notesReducer from './notesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    class: classReducer,
    student : studentReducer,
    teacher : teacherReducer,
    notes : notesReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;