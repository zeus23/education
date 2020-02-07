import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';

import { addSubs } from './../../store/actions/classActions';
import {deleteStudent} from '../../store/actions/studentActions';

class ClassDetails extends React.Component{
    constructor(props){
        super(props);

        const {item} = this.props;
        this.state = {
            id: '',
            class:item,
            classSubject : [],
            day:'',
            time:'',
            title:'',
            toggle: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFormDisplay = () => {
        this.setState({
            toggle:true
        })
    }

    handleAddSubject = () => {
        const { classDetail } = this.props;

        this.setState({
            toggle:false
        })

        classDetail && classDetail.map((m)=>{
            this.setState({
                id: m.id
            })
        })
        
        var x={};
        x['day']=this.state.day;
        x['time']=this.state.time;
        x['name']=this.state.title;

        this.setState({
            classSubject:[...this.state.classSubject,x] ,
            day:'',
            time:'',
            title:''
        });
        
    }

    handleDelete = (id) => {
        this.props.deleteStudent(id);
    }

    handleSubmit = (e) => {

        this.props.addSubs(this.state);
        this.setState({
            classSubject:[]
        })
    }

    render() {
        const {classDetail, item, studentList, addStatus} = this.props;

        var i = [];
            classDetail && classDetail.map( classSub => {
                for(var key in classSub.subjects){
                    i.push(classSub.subjects[key].name);
                }
        })
        return (
            <div className="class-subjects">
                <div className="class-subjects-heading">
                    <h1>Class :{item}</h1>
                    <h5>Subjects offered:</h5>    
                </div>
                
                <div className="class-subjects-list">
                    {i && i.map(sub=>(
                        <div className="subject-tag">
                            <h1 style={{marginRight:"20px"}}>{sub}</h1><button class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">clear</i></button>
                        </div>  
                    ))}
                    {this.state.classSubject && this.state.classSubject.map((y)=>{
                        return (
                            <div className="subject-tag">
                                <h1>{y.name}</h1>
                            </div>
                        )
                    })}
                    {
                        this.state.classSubject.length > 0 ? <button class="btn-floating btn-small waves-effect waves-light green" style={{marginRight:"10px"}} onClick={this.handleSubmit}><i class="material-icons">check</i></button> : null
                    }
                   <button class="btn-floating btn-small waves-effect waves-light" id="add_sub" onClick={this.handleFormDisplay} style={{marginRight:"20px"}}><i class="material-icons">add</i></button>
                    {
                        this.state.toggle ? 
                        <form style={{border:"1.5px solid black",borderRadius:"15px", padding:"1rem"}}>
                            <input id="title" type="text" placeholder="Subject Title" onChange={this.handleChange}></input>
                            <input id="day" type="text" placeholder="Day" onChange={this.handleChange}></input>
                            <input id="time" type="text" placeholder="Time" onChange={this.handleChange}></input>
                            <button class="btn-floating btn-small waves-effect waves-light" onClick={this.handleAddSubject}><i class="material-icons">check</i></button>
                            <button onClick={()=>{this.setState({toggle:false})}} class="waves-effect waves-light btn-small red" style={{float:"right"}}><i class="material-icons">cancel</i></button>
                        </form>
                        :
                        null
                    }
                </div>
               
                <div className="class-students-headings">
                    <h5>Students:</h5>  
                </div>
                <div className="class-students-list">
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
                            { studentList && studentList.map((student)=>{
                                return(
                                    <tr>
                                        <td><img src={student.photo} alt="img" style={{width:"70px", height:"70px"}}/></td>
                                        <td>{student.name}</td>
                                        <td>{student.class}</td>
                                        
                                        <td>{student.phone}</td>
                                        
                                        
                                        <td>{student.gName}</td>
                                        <td>{student.gPhone}</td>
                                        <td style={{display:"flex",flexWrap:"wrap"}}>{student.subjects.map((x)=>{
                                           
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
                                            <Link to={'/studentEdit/'+student.email}>
                                                <button class="waves-effect waves-light btn-small" style={{marginRight:"5px"}}><i class="material-icons">remove_red_eye</i></button>
                                            </Link>
                                            
                                            <button class="waves-effect waves-light btn-small red"><i class="material-icons" onClick={()=>this.handleDelete(student.id)}>clear</i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                </div> 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const item = ownProps.match.params.item;
    const classDetail = state.firestore.ordered.classes;
    const studentList = state.firestore.ordered.students;
    
    return {
        item: item,
        classDetail:classDetail,
        studentList:studentList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent : (id) => dispatch(deleteStudent(id)),
        addSubs: (subdetails) => dispatch(addSubs(subdetails))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        if(props){
            return [
                { collection: 'classes', where: ['class', '==', props.item] },
                { collection: 'students', where: ['class', '==', props.item]}
            ]
        }
    })
)(ClassDetails);