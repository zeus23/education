import { combineReducers } from "redux";
import authReducer from './authReducer';
import classReducer from './classReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import studentReducer from "./studentReducer";
import teacherReducer from './teacherReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    class: classReducer,
    student : studentReducer,
    teacher : teacherReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;