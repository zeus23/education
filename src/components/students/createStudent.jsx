import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from '../../config/fbConfig';
import {admission} from '../../store/actions/studentActions';

import history from '../../index';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class CreateStudent extends React.Component{
    state = {
        email:'',
        name:'',
        address:'',
        phone:'',
        dob:'',
        gender:'',
        gname:'',
        gphone:'',
        photo:'',
        qr:'',
        class:'',
        subjectslist:[],
        subjects:[],
        data:[],
        fees:[],
        results:[],
        upcoming:[],
        attendance:[]
    }

    handleArrayChange=(e)=> {
        const options =this.state.subjects;
        let index;
        if (e.target.checked) {
          options.push(e.target.value)
        } 
        else {
          index = options.indexOf(e.target.value)
          options.splice(index, 1)
        }
        this.setState({ subjects: options })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            subjectslist:[],
            data:[]
        })
        firebase.firestore().collection("classes").where("class","==", e.target.value).get()
        .then(snap=>{
            snap.forEach(doc=>{
                this.setState({
                    data : [...this.state.data, doc.data().subjects] 
                })
            })
            this.state.data.map((y)=>{
                y.map((x)=>{
                    this.setState({
                        subjectslist : [...this.state.subjectslist, x]
                    })
                })
                
            })
        })
    }

    handleImageChange=(e)=>{
        if (e.target.files[0]) {
            const image = e.target.files[0];
            const imageSize=image.size/1000000;
            let reader = new FileReader();
            if(image.type ==="image/jpeg" || image.type==="image/png" && imageSize<5)
            {
                reader.onloadend = () => {
                    this.setState({
                      photo: reader.result
                    });
                  }
                  reader.readAsDataURL(image)
            }
            else{
                console.log("Too Big");
                this.setState({
                    photo:''
                  });
            }
          }
    }

    handleSubmit = (e) => {
        this.props.admission(this.state);
        this.setState({
            email:'',
        name:'',
        address:'',
        phone:'',
        dob:'',
        gender:'',
        gname:'',
        gphone:'',
        photo:'',
        qr:'',
        class:'',
        subjectslist:[],
        subjects:[],
        data:[],
        fees:[],
        results:[],
        upcoming:[],
        attendance:[]
        })
    }

    render (){
        const { x , admissionStatus} = this.props;
        return(
            <div className="container">
            <form className="white">
                <h5 className="grey-text text-darken-3">Register Student Here</h5>
                <div className="input-field">
                    <label htmlFor="photo">Photo</label>
                    <input type="file" id="photo" onChange={this.handleImageChange} />
                    <img src={this.state.photo || 'https://img.icons8.com/pastel-glyph/2x/plus.png'} alt="photo" style={{width:"100px",height:"100px"}}/>
                </div>
                
                <div>
                <label>Select Class</label>
                    <select className="browser-default" id="class" onChange={this.handleSelect}>
                        <option value={this.state.class} disabled selected>Choose your option</option>
                        {
                            x && x.map(classItem => (
                                <option value={classItem.class}>{classItem.class}</option>
                            ))
                        }
                    </select>    
                </div>
                <div>
                    {this.state.subjectslist && this.state.subjectslist.map((sub)=>{
                        return(
                            <label>
                                <input type="checkbox" value={sub.name} onChange={this.handleArrayChange}/>
                                <span>{sub.name}</span>
                            </label>
                        )
                    })}
                </div>
               
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={this.state.address} onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" value={this.state.phone} onChange={this.handleChange} />
                </div>
            
                <div>
                    <label htmlFor="dob">D.O.B</label>
                    <input type="date" id="dob" value={this.state.dob} onChange={this.handleChange}/>
                </div>
                
                <div>
                    <label>
                        <input type="radio" id="gender" name="gender" value="male" onChange={this.handleChange} /><span>Male</span>
                    </label>
                    <label>
                        <input type="radio" id="gender" name="gender" value="female" onChange={this.handleChange} /><span>Female</span>
                    </label>
                </div>
                <div className="input-field">
                    <label htmlFor="gname">Guardian Name</label>
                    <input type="text" id="gname" value={this.state.gname} onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="gphone">Guardian Phone</label>
                    <input type="text" id="gphone" value={this.state.gphone} onChange={this.handleChange} />
                </div>
                
                
            </form>
            <div className="input-field">
                    <button className="btn yellow lighten-1 z-depth-0" onClick={()=>this.handleSubmit(admissionStatus)}>Register</button>
            </div>
            {admissionStatus?<p>{admissionStatus}</p>:null}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.firestore.ordered.classes,
        admissionStatus: state.student.admissionStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        admission: (details) => dispatch(admission(details))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'classes'}
    ])
)(CreateStudent);