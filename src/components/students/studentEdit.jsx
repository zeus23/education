import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';
import './studentEdit.style.css';
import history from '../../index';


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
                toggle: false,
                toggle2:false,
                month:'',
                amount:''
            }
    }
    componentDidMount(){
        var id=this.props.id;
        var x=[];
        firebase.firestore().collection('students').where('email','==',id).get()
        .then(snap=>{
            snap.forEach(doc=>{
                firebase.firestore().collection("classes").where("class","==",doc.data().class).get()
                .then(snap=>{
                    snap.forEach(doc2=>{
                        this.setState({
                            data :doc2.data().subjects,
                            subjectslist:[]
                        })
                    })
                    var csub=doc.data().subjects;
                    this.state.data.map((y)=>{
                            if(csub.includes(y.name))
                            {
                                y['present']=true;
                                this.setState({
                                    subjectslist : [...this.state.subjectslist,y]
                                })
                            }
                            else{
                                y['present']=false;
                                this.setState({
                                    subjectslist : [...this.state.subjectslist,y]
                                })
                            }
                    })
                    
                })
            })
        })
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
            toggle:true
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
          options.splice(index, 1);
          var x={};
          x=this.state.subjectslist;
          x.map(ii=>{
            if(ii.name===e.target.value)
            {
                ii['present']=false
            }
            console.log(ii);
          })
        }
        this.setState({ subject: options })
    }


    handleChange = (e) => {
        const { value, name } = e.target;
		this.setState({ [name]: value });
	};
    handleFees=()=>{
        firebase.firestore().collection('students').doc(this.state.id).get()
        .then(snap=>{
            var fees={},x={},final={};
            fees=snap.data().fees;
            x['Month']=this.state.month;
            x['Amount']=this.state.amount;
            x['paid']=true;
            final=fees.concat(x);
            firebase.firestore().collection('students').doc(this.state.id).update({
                fees:final
            }).then(()=>{
                this.setState({
                    toggle2:false
                })
            }).catch((err)=>{
                console.log(err);
            })
        })
    }
    handleSave = () => {
        firebase.firestore().collection('students').doc(this.state.id).update({
            photo: this.state.photo,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            gender: this.state.gender,
            dob: this.state.dob,
            gName: this.state.gname,
            gPhone: this.state.gphone,
            subjects:this.state.subjects
        }).then(()=>{
            history.go(0);
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    render (){
        const { student, editStatus, x } = this.props;
        var i=1;
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
                                        <button onClick={()=>{this.setState({toggle:false});history.go(0)}} class="waves-effect waves-light btn-small red"><i class="material-icons">cancel</i></button>
                                    </>
                                    :
                                        <button onClick={()=>this.handleEdit(item, x)} class="waves-effect waves-light btn-small black"><i class="material-icons">edit</i></button>
                                    }    
                            </div>
                            <div className="editBox" style={{padding:'1rem'}}>
                                <div className="edit-input">
                                    <label htmlFor="photo">Photo:</label>
                                    {
                                        this.state.toggle
                                        ?
                                        <>
                                        <img src={this.state.photo} alt="photo" style={{width:"100px",height:"100px",marginLeft:'1rem'}}/>
                                        <input type="file" id="photo" onChange={this.handleImageChange} />
                                        </>
                                        :
                                        <img src={item.photo} alt="photo" style={{width:"100px",height:"100px",marginLeft:'1rem'}}/>
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
                                        :
                                        <p>{item.gender}</p>
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
                                                if(sub.present)
                                                {
                                                    return(
                                                        <label style={{marginLeft:'0.5rem'}}>
                                                            <input type="checkbox" checked value={sub.name} onChange={this.handleArrayChange}/>
                                                            <span>{sub.name}</span>
                                                        </label>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <label style={{marginLeft:'0.5rem'}}>
                                                            <input type="checkbox" value={sub.name} onChange={this.handleArrayChange}/>
                                                            <span>{sub.name}</span>
                                                        </label>
                                                    )
                                                }
                                            })}
                                        </>
                                        :
                                        <div style={{display:'flex'}}>
                                        { item.subjects.map((sub)=>{
                                            if(item.subjects.length>i){
                                                i++;
                                                return(
                                                    <p>{sub},</p>
                                                    )
                                            }
                                            else{
                                                return(
                                                    <p>{sub}</p>
                                                    )
                                            }
                                        })}
                                        </div>
                                    }
                                    
                                </div>
                                {
                                    this.state.toggle
                                    ?
                                    <div className="edit-input">
                                        <div className="edit-input">
                                            <label>Fees:</label>
                                            <div>
                                                { item.fees.map((fee)=>{
                                                    return(
                                                        <div style={{display:'flex'}}>
                                                            <p>Month: {fee.Month}</p>
                                                            <p style={{marginLeft:'5px'}}>Amount: {fee.Amount}</p>
                                                        </div>
                                                        )
                                                })}
                                            </div>
                                        </div>
                                        <button class="btn-floating btn-small waves-effect waves-light" id="add_sub" onClick={()=>this.setState({toggle2:true})} style={{marginRight:"20px"}}><i class="material-icons">add</i></button>
                                        {this.state.toggle2
                                        ?
                                        <div>
                                            <div style={{border:"1.5px solid black",borderRadius:"15px", padding:"1rem"}}>
                                                <input name="month" type="text" placeholder="Month" onChange={this.handleChange}></input>
                                                <input name="amount" type="text" placeholder="Amount" onChange={this.handleChange}></input>
                                                <button class="btn-floating btn-small waves-effect waves-light" onClick={this.handleFees}><i class="material-icons">check</i></button>
                                                <button onClick={()=>{this.setState({toggle2:false})}} class="waves-effect waves-light btn-small red" style={{float:"right"}}><i class="material-icons">cancel</i></button>
                                            </div>
                                        </div>
                                        :
                                        null
                                        }
                                    </div>
                                    :
                                    <div className="edit-input">
                                        <label>Fees:</label>
                                        <div>
                                            { item.fees.map((fee)=>{
                                                return(
                                                    <div style={{display:'flex'}}>
                                                        <p>Month: {fee.Month}</p>
                                                        <p style={{marginLeft:'5px'}}>Amount: {fee.Amount}</p>
                                                    </div>
                                                    )
                                            })}
                                        </div>
                                    </div>
                                }
                                {this.state.toggle
                                    ?
                                    null
                                    :
                                    <div className="edit-input">
                                        <label>Attendance:</label>
                                        <div>
                                            { item.attendance.map((atttend)=>{
                                                return(
                                                    <div style={{display:'flex'}}>
                                                        <p>Day: {atttend.day}</p>
                                                        <p style={{marginLeft:'5px'}}>Time: {atttend.time}</p>
                                                        <p style={{marginLeft:'5px'}}>Subject: {atttend.subject}</p>
                                                    </div>
                                                    )
                                            })}
                                        </div>
                                    </div>
                                }
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        if(props){
            return [
                { collection: 'students', where: ['email', '==', props.id] },
                { collection : 'classes'}
            ]
        }
    })
)(StudentEdit);