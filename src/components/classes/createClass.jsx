import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { classes } from '../../store/actions/classActions';
import './classes.style.css';
import firebase from '../../config/fbConfig';

class CreateClass extends React.Component{

    state = {
        class:'',
        subjects:[],
        day:'',
        time:'',
        title:'',
        toggle:false
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
        this.setState({
            toggle:false
        })
        var x={};
        x['day']=this.state.day;
        x['time']=this.state.time;
        x['name']=this.state.title;
        
        this.setState({
            subjects:[...this.state.subjects,x],
            day:'',
            time:'',
            title:''
        });
    }

    handleSubmit = (e) => {
        this.props.classes(this.state);
        this.setState({
            class:'',
            subjects:[]
        })
    }

    render() {
        const {classStatus} =this.props;
        return (
            <div className="create-class-container">
                <div className="create-class-form">
                    <div className="input-field">
                        <label htmlFor="class">Enter Class Title</label>
                        <input type="text" id="class" onChange={this.handleChange} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
                        {this.state.subjects && this.state.subjects.map((item)=>{
                            return (
                                <p style = {{height:"50px", width:"100px", backgroundColor:"green", borderRadius:"10px",color:"white",padding:"1rem 2rem",marginRight:"10px"}}>{item.name}</p>
                            )
                        })}
                    </div>
                    <label style={{marginRight:"10px"}}>Add Subjects</label>
                    <button class="btn-floating btn-small waves-effect waves-light" id="add_sub" onClick={this.handleFormDisplay}><i class="material-icons">add</i></button>
                    {
                        this.state.toggle ? 
                        <form style={{border:"1.5px solid black",borderRadius:"15px", padding:"1rem", margin:"20px 0"}}>
                            <input id="title" type="text" placeholder="Subject Title" onChange={this.handleChange}></input>
                            <input id="day" type="text" placeholder="Day" onChange={this.handleChange}></input>
                            <input id="time" type="text" placeholder="Time" onChange={this.handleChange}></input>
                            <button class="btn-floating btn-small waves-effect waves-light green" onClick={this.handleAddSubject}><i class="material-icons">check</i></button>
                            <button onClick={()=>{this.setState({toggle:false})}} class="waves-effect waves-light btn-small red" style={{float:"right"}}><i class="material-icons">cancel</i></button>
                        </form>
                        :
                        null
                    }
                    <div className="input-field">
                        <button className="btn yellow z-depth-0" onClick={this.handleSubmit}>Add Class</button>
                    </div>
                </div>
                {classStatus?<p>{classStatus}</p>:null}
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classStatus: state.class.classStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        classes: (details) => dispatch(classes(details))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'classes'}
    ])
)(CreateClass);