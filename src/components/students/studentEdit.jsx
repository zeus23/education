import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateStudentProfile } from '../../store/actions/studentActions';
import firebase from '../../config/fbConfig';
import './studentEdit.style.css';


class StudentEdit extends React.Component{
    constructor(props){
        super(props);
        
            this.state = {
                id:'',
                photo: '',
                name: '',
                email:'',
                address: '',
                phone: '',
                gender: '',
                dob: '',
                gname: '',
                gphone: '',
                class:'',
                subjectslist:[],
                subjects:[],
                data:[],
                fees:[],
                results:[],
                upcoming:[],
                toggle: false
            }
    }

    handleEdit = (student, x) => {
        this.setState({
            id: student.id,
            class: student.class,
            photo: student.photo,
            name: student.name,
            email: student.email,
            address: student.address,
            phone: student.phone,
            gender: student.gender,
            dob: student.dob,
            gname: student.gName,
            gphone: student.gPhone,
            subjects: student.subjects,
            subjectslist : student.subjects,
            toggle : true
        })
        console.log(x);
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
        const { value, name } = e.target;
		this.setState({ [name]: value });
	};

    handleSave = () => {
        this.props.updateStudentProfile(this.state);
        this.setState({
            id:'',
            photo: '',
            name: '',
            email:'',
            address: '',
            phone: '',
            gender: '',
            dob: '',
            gname: '',
            gphone: '',
            subjects: '',
            toggle: false
        })
    }

    render (){
        const { student, editStatus, x } = this.props;

       return(
          <div>
              {
                  student && student.map(item=>{
                    return(
                        <div className="edit-area">
                            <div className="edit-btn-box">
                            {this.state.toggle 
                                    ?
                                    <>
                                        <button onClick={this.handleSave} class="waves-effect waves-light btn-small green"><i class="material-icons">done</i></button>
                                        <button onClick={()=>{this.setState({toggle:false})}} class="waves-effect waves-light btn-small red"><i class="material-icons">cancel</i></button>
                                    </>
                                    :
                                        <button onClick={()=>this.handleEdit(item, x)} class="waves-effect waves-light btn-small black"><i class="material-icons">edit</i></button>
                                    }    
                            </div>
                            <div className="editBox">
                                <div className="edit-input">
                                    <label htmlFor="photo">Photo</label>
                                    <input type="file" id="photo" onChange={this.handleImageChange} />
                                    {
                                        this.state.toggle ? 
                                        <img src={this.state.photo} alt="photo" style={{width:"100px",height:"100px"}}/>
                                        :
                                        <img src={item.photo} alt="photo" style={{width:"100px",height:"100px"}}/>
                                    }
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="name">Name:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="name" id="name" value={this.state.name}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.name}</h6>   
                                    }
                                    
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="email">Email:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="email" id="email" value={this.state.email}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.email}</h6>   
                                    }
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="address">Address:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="address" id="address" value={this.state.address}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.address}</h6>   
                                    }
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="phone">Phone:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="phone" id="phone" value={this.state.phone}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.phone}</h6>   
                                    }
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="dob">D.O.B:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="dob" id="dob" value={this.state.dob}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.dob}</h6>   
                                    }
                                </div>
                                <div className="edit-input">
                                <label htmlFor="dob">Gender:</label>
                                    {
                                        this.state.toggle ?
                                        <>
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="male" onChange={this.handleChange} /><span>Male</span>
                                            </label>
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="female" onChange={this.handleChange} /><span>Female</span>
                                            </label>
                                        </>
                                        :
                                        item.gender == 'male' ?
                                        <> 
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="male" onChange={this.handleChange} checked="checked"/><span>Male</span>
                                            </label>
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="female" onChange={this.handleChange} /><span>Female</span>
                                            </label>
                                        </>
                                            :
                                        <>
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="male" onChange={this.handleChange}/><span>Male</span>
                                            </label>
                                            <label>
                                                <input type="radio" id="gender" name="gender" value="female" onChange={this.handleChange} checked="checked"/><span>Female</span>
                                            </label>
                                        </>
                                    }   

                                    
                                   
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="gname">Guardian Name:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="gname" id="gname" value={this.state.gname}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.gName}</h6>   
                                    }
                                </div>
                                <div className="edit-input">
                                    <label htmlFor="gphone">Guardian Phone:</label>
                                    {
                                        this.state.toggle ? 
                                            <><input type="text" name="gphone" id="gphone" value={this.state.gphone}  onChange={this.handleChange}></input></>
                                            :
                                            <h6>{item.gPhone}</h6>   
                                    }
                                </div>
                                
                                <div className="edit-input">
                                    
                                    {
                                        this.state.toggle ?
                                        <>
                                            <label>Select Class</label>
                                            <select className="browser-default" id="class" onChange={this.handleSelect}>
                                            <option value='' disabled selected>{this.state.class}</option>
                                            {
                                                x && x.map(classItem => (
                                                    <option value={classItem.class}>{classItem.class}</option>
                                                ))
                                            }
                                            </select>
                                        </>
                                        :
                                        <>
                                            <label>Class:</label>
                                            <p>{item.class}</p>
                                        </>
                                    }
                                    
                                        
                                </div>
                                <div className="edit-input">
                                    <label>Subjects:</label>
                                    {
                                        this.state.toggle ? 
                                        <>
                                            {this.state.subjectslist && this.state.subjectslist.map((sub)=>{
                                                return(
                                                    <label>
                                                        <input type="checkbox" value={sub.name} onChange={this.handleArrayChange}/>
                                                        <span>{sub.name}</span>
                                                    </label>
                                                )
                                            })}
                                        </>
                                        :
                                        <>
                                        { item.subjects.map((sub)=>{
                                            return(
                                                    <label>
                                                        <input type="checkbox" value={sub.name} onChange={this.handleArrayChange} checked/>
                                                        <span>{sub}</span>
                                                    </label>
                                                )
                                            })}
                                        </>
                                    }
                                    
                                </div>

                            </div>
                        </div>
                    )
                  })
              }
          </div>
       )
    }
}
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const student = state.firestore.ordered.students;
    const editStatus = state.student.editStatus;
    const x = state.firestore.ordered.classes;
    return{
        student : student,
        id: id,
        editStatus : editStatus,
        x : x
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateStudentProfile : (profile) => dispatch(updateStudentProfile(profile))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        if(props){
            return [
                { collection: 'students', where: ['email', '==', props.id] },
                { collection : 'classes'}
            ]
        }
    })
)(StudentEdit);