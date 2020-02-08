import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/layout/navbar';
import SignIn from './components/auth/SignIn';
import ClassList from './components/classes/classList';
import ClassDetails from './components/classes/classDetails';
import CreateStudent from './components/students/createStudent';
import StudentList from './components/students/studentList';
import StudentEdit from './components/students/studentEdit';
import CreateClass from './components/classes/createClass';
import CreateTeacher from './components/teachers/createTeacher';
import TeacherList from './components/teachers/teacherList';
import TeacherEdit from './components/teachers/teacherEdit';
import firebase from './config/fbConfig';
import NotesList from './components/notes/notesList';
import NotesDetails from './components/notes/notesDetails';
import CreateNote from './components/notes/createNotes';

class App extends React.Component{
	constructor(){
		super();
		this.state={
			user:firebase.auth().currentUser
		}
	}
  render () {
    return (
	<BrowserRouter>
		<div className="App">
			<Navbar/>
			<Switch>
				<Route exact path="/" component={Dashboard}/>
				<Route exact path="/teacherList" component={TeacherList}/>
				<Route exact path="/teacherEdit/:id" component={TeacherEdit} />
				<Route exact path="/createTeacher" component={CreateTeacher}/>
				<Route exact path="/classList" component={ClassList} />
				<Route exact path="/createClass" component={CreateClass} />
				<Route path="/classList/class-:item" component={ClassDetails} />
				<Route exact path="/studentList" component={StudentList} />
				<Route exact path="/studentEdit/:id" component={StudentEdit} />
				<Route exact path="/createStudent" component={CreateStudent} />
				<Route exact path="/notesList" component={NotesList}/>
				<Route path="/notesList/notes-:item" component={NotesDetails} />
				<Route exact path="/createNote" component={CreateNote} />
				<Route path="/signin" component={SignIn} />
			</Switch>
		</div>
	</BrowserRouter> 
    )
  }
}

export default App;
