import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from '../../config/fbConfig';
import {addTeacher} from '../../store/actions/teacherActions';

class CreateTeacher extends React.Component{
    state = {
        email : '',
        name: '',
        phone: '',
        gender: '',
        photo: ''
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
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTeacher(this.state);
    }

    render() {
        const { addStatus } = this.props;
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Register Teacher Here</h5>
                    <div className="input-field">
                        <label htmlFor="photo">Photo</label>
                        <input type="file" id="photo" onChange={this.handleImageChange} />
                        <img src={this.state.photo || 'https://img.icons8.com/pastel-glyph/2x/plus.png'} alt="photo" style={{width:"100px",height:"100px"}}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" onChange={this.handleChange} />
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
                        <button className="btn yellow lighten-1 z-depth-0">Register</button>
                    </div>
                </form>
                {addStatus?<p>{addStatus}</p>:null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addStatus: state.teacher.addStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTeacher: (details) => dispatch(addTeacher(details))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(CreateTeacher);