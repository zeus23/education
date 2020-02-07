import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import {deleteStudent} from '../../store/actions/studentActions';

class StudentList extends React.Component{

    handleDelete = (id) => {
        this.props.deleteStudent(id);
    }

    render() {
        const { stdList } = this.props;

        return(
            <div className="student-list-section" style={{width:"100%",display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"center"}}>
                <a href="/createStudent" target="_blank" class="btn-floating btn-large waves-effect waves-light black" style={{margin:"1rem"}}><i class="material-icons">add</i></a>
                <h3>Student List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>PHOTO</th>
                            <th>NAME</th>
                            <th>CLASS</th>
                            
                            <th>PHONE</th>
                            
                            <th>GUARDIAN NAME</th>
                            <th>GUARDIAN PHONE</th>
                            <th style={{width:"20%"}}>SUBJECTS</th>
                      
                            <th style={{width:"10%"}}>FEES</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stdList && stdList.map((student)=>{
                            var i=1;
                            return(
                                <tr>
                                    <td><img src={student.photo} alt="img" style={{width:"70px", height:"70px"}}/></td>
                                    <td>{student.name}</td>
                                    <td>{student.class}</td>
                                    
                                    <td>{student.phone}</td>
                                    
                                    
                                    <td>{student.gName}</td>
                                    <td>{student.gPhone}</td>
                                    <td style={{display:"flex",flexWrap:"wrap"}}>{student.subjects.map((x)=>{
                                        console.log(student.subjects.length,i);
                                        if(student.subjects.length>i){
                                            i++;
                                            return(
                                            
                                                <p style={{marginRight:"5px"}}>{x},</p>
                                            )
                                        }
                                        else{
                                            return( 
                                                <p style={{marginRight:"5px"}}>{x}</p>
                                            )
                                        }
                                        
                                    })}</td>
                                 
                                    <td>{student.fees.map((y)=>{
                                        return(
                                            y.paid?<p>{y.Month}</p>:null
                                        )
                                    })}</td>
                                    <td>
                                        <Link to={'./studentEdit/'+student.email}>
                                            <button class="waves-effect waves-light btn-small" style={{marginRight:"5px"}}><i class="material-icons">remove_red_eye</i></button>
                                        </Link>
                                        
                                        <button class="waves-effect waves-light btn-small red" onClick={()=>this.handleDelete(student.id)}><i class="material-icons">clear</i></button>
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
        stdList : state.firestore.ordered.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteStudent : (id) => dispatch(deleteStudent(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'students', orderBy:["class", "asc"]}
    ])
)(StudentList);