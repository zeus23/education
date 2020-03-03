import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateTeacherProfile } from '../../store/actions/teacherActions';
import firebase from '../../config/fbConfig';
import './teacherEdit.style.css';


class TeacherEdit extends React.Component{
    constructor(props){
        super(props);
        
            this.state = {
                id:'',
                photo: '',
                name: '',
                email:'',
                phone: '',
                gender: '',
                toggle: false
            }
    }

    handleEdit = (teacher) => {
        this.setState({
            id: teacher.id,
            photo: teacher.photo,
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
            gender: teacher.gender,
            toggle : true
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

    handleChange = (e) => {
        const { value, name } = e.target;
		this.setState({ [name]: value });
	}

    handleSave = () => {
        this.props.updateTeacherProfile(this.state);
        this.setState({
            id:'',
            photo: '',
            email:'',
            name: '',
            phone: '',
            gender: '',
            toggle: false
        })
    }

    render (){
        const { teacher, editStatus} = this.props;

       return(
          <div>
              {
                  teacher && teacher.map(item=>{
                    return(
                        <div className="edit-area">
                            <div className="edit-btn-box" style={{marginTop:"15px"}}>
                            {this.state.toggle 
                                    ?
                                    <>
                                        <button onClick={this.handleSave} class="waves-effect waves-light btn-small green" style={{marginRight:"15px"}}><i class="material-icons">done</i></button>
                                        <button onClick={()=>{this.setState({toggle:false})}} class="waves-effect waves-light btn-small red"><i class="material-icons">cancel</i></button>
                                    </>
                                    :
                                        <button onClick={()=>this.handleEdit(item)} class="waves-effect waves-light btn-small black"><i class="material-icons">edit</i></button>
                                    }    
                            </div>

                            <div className="editBox" style={{padding:'1rem'}}>

                                <div className="edit-input">
                                    <label htmlFor="photo">Photo</label>
                                    <input type="file" id="photo" onChange={this.handleImageChange} />
                                    {
                                        this.state.toggle ? 
                                        <img src={this.state.photo} alt="photo" style={{width:"100px",height:"100px",marginLeft:'1rem'}}/>
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
                                            <h6>{item.email}</h6> 
                                            :
                                            <h6>{item.email}</h6>   
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
    const teacher = state.firestore.ordered.teachers;
    const editStatus = state.teacher.editStatus;
    return{
        teacher : teacher,
        id: id,
        editStatus : editStatus
    }

}

const mapDispatchToProps = (dispatch) => {
    
    return{
        updateTeacherProfile : (profile) => dispatch(updateTeacherProfile(profile))
    }

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        if(props){
            return [
                { collection: 'teachers', where: ['email', '==', props.id] },
            ]
        }
    })
)(TeacherEdit);