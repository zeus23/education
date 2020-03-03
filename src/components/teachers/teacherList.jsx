import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import {deleteTeacher} from '../../store/actions/teacherActions';

import $ from 'jquery';

import Loader from '../gifs/loader';
import Success from '../gifs/success';

class TeacherList extends React.Component{

    handleDelete = (id) => {
        this.props.deleteTeacher(id);
    }

    componentDidMount(){
        $(document).ready(function(){
            $("#searchInput").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $("#teacher-table tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
        });
    }

    render() {
        const { teacherList } = this.props;
        return(
            <div className="student-list-section" style={{width:"100%",display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"center"}}>
                <a href="/createTeacher" target="_blank" class="btn-floating btn-large waves-effect waves-light black" style={{margin:"1rem"}}><i class="material-icons">add</i></a>
                <h3>Teacher List</h3>

                <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                    <input id="searchInput" type="text" placeholder="Search.." style={{width:"20vw",margin:"1rem 0.5rem",padding:"0.2rem 1rem", border:"1px solid black", borderRadius:"10px"}}></input>
                </div>
                
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
                    <tbody id="teacher-table">
                        {   
                            teacherList && teacherList.map((teacher) => {
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