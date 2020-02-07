import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import {deleteTeacher} from '../../store/actions/teacherActions';

class TeacherList extends React.Component{

    handleDelete = (id) => {
        this.props.deleteTeacher(id);
    }

    render() {
        const { teacherList } = this.props;

        return(
            <div className="student-list-section" style={{width:"100%",display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"center"}}>
                <a href="/createTeacher" target="_blank" class="btn-floating btn-large waves-effect waves-light black" style={{margin:"1rem"}}><i class="material-icons">add</i></a>
                <h3>Teacher List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>PHOTO</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>GENDER</th>
                            <th>PHONE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherList && teacherList.map((teacher)=>{
                            var i=1;
                            return(
                                <tr>
                                    <td><img src={teacher.photo} alt="img" style={{width:"70px", height:"70px"}}/></td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.gender}</td>
                                    <td>{teacher.phone}</td>
                                    <td>
                                        <Link to={'./teacherEdit/'+teacher.email}>
                                            <button class="waves-effect waves-light btn-small" style={{marginRight:"5px"}}><i class="material-icons">remove_red_eye</i></button>
                                        </Link>
                                        
                                        <button class="waves-effect waves-light btn-small red"><i class="material-icons" onClick={()=>this.handleDelete(teacher.id)}>clear</i></button>
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacherList : state.firestore.ordered.teachers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTeacher : (id) => dispatch(deleteTeacher(id)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'teachers'}
    ])
)(TeacherList);