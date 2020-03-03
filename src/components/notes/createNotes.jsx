import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from '../../config/fbConfig';
import {addNotes} from './../../store/actions/notesActions';


class CreateNote extends React.Component{

    state = {
        class:'',
        subjectslist:[],
        subject:'',
        data:[],
        topic:'',
        name:'',
        pdfLink:'',
        pdf:''
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

    handleSelect2 = (e) => {
        this.setState({
            subject:e.target.value
        })
    }

    handleFileChange=(e)=>{
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.setState({
                pdf:file
            })
          }
    }

    handleSubmit = () => {
        var count=0,subjects=[],topics=[],prevNotes = {},prevTopics = {},id;
        firebase.storage().ref(`notes/${this.state.class}/${this.state.subject}/${this.state.topic}/${this.state.name}`).put(this.state.pdf)
        .then(()=>{
            firebase.storage().ref(`notes/${this.state.class}/${this.state.subject}/${this.state.topic}`).child(this.state.name).getDownloadURL().then(url=>{
                this.setState({
                    pdfLink:url
                })
                firebase.firestore().collection('notes').where("class", "==", this.state.class)
                .get()
                .then(snap=>{
                        if(snap.docs.length>0){
                        snap.forEach(doc=>{
                            subjects.push(doc.data().subject);
                            
                            if(doc.data().subject===this.state.subject){
                                prevNotes = doc.data().pdflist;
                                prevTopics = doc.data().Topic;
                                id=doc.id;
                                topics=doc.data().Topic;
                            }
                        })
                                if(subjects.includes(this.state.subject)){
                                    console.log(topics);
                                    var  final = [],finalNotes={}, x = {};
                                    x['Topic'] = this.state.topic;
                                    x['name'] = this.state.name;
                                    x['pdflink'] = this.state.pdfLink;
                                    final = [...final,x];
                                    finalNotes=final.concat(prevNotes);
                                    prevTopics.push(this.state.topic);
                                    if (topics.includes(this.state.topic)) {
                                        firebase.firestore().collection("notes").doc(id).update({
                                            pdflist :finalNotes
                                        }).then(()=>{
                                            console.log("done");
                                        }).catch((err)=>{
                                            console.log(err);
                                        })
                                    }
                                    else{
                                        firebase.firestore().collection("notes").doc(id).update({
                                            pdflist :finalNotes,
                                            Topic: prevTopics
                                        }).then(()=>{
                                            console.log("done");
                                        }).catch((err)=>{
                                            console.log(err);
                                        })
                                    }
                                }
                                else{
                                    var x = {}, y=[], pdflis = [];
                                    y.push(this.state.topic);
                                    x['Topic'] = this.state.topic;
                                    x['name'] = this.state.name;
                                    x['pdflink'] = this.state.pdfLink;
                                    pdflis = [...pdflis, x];
                                    firebase.firestore().collection('notes').add({
                                        Topic:y,
                                        class:this.state.class,
                                        subject: this.state.subject,
                                        pdflist : pdflis
                                    })
                                }
                    }
                    else{
                        var x = {}, y=[], pdflis = [];
                        y.push(this.state.topic);
                        x['Topic'] = this.state.topic;
                        x['name'] = this.state.name;
                        x['pdflink'] = this.state.pdfLink;
                        pdflis = [...pdflis, x];
                        firebase.firestore().collection('notes').add({
                            Topic:y,
                            class:this.state.class,
                            subject: this.state.subject,
                            pdflist : pdflis
                        })
                    }
                })
            })
        })
        
    }

    render() {
        const { x } = this.props;
        return(
            <div className="container">
                <h5 className="grey-text text-darken-3">Add New Notes Here</h5>

                <form className="white">

                    <div className="input-field">
                        <input type="file" onChange={this.handleFileChange} />
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
                        <select className="browser-default" id="class" onChange={this.handleSelect2}>
                            <option value={this.state.subject} disabled selected>Choose your option</option>
                            {this.state.subjectslist && this.state.subjectslist.map((sub)=>{
                            return(
                                <option value={sub.name}>{sub.name}</option>  
                            )
                        })}
                        </select>    
                        
                    </div>

                    <div className="input-field">
                        <label htmlFor="topic">Topic</label>
                        <input type="text" id="topic" value={this.state.topic} onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    
                </form>
                <div className="input-field">
                        <button className="btn yellow lighten-1 z-depth-0" onClick={this.handleSubmit}>Add Notes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.firestore.ordered.classes
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addNotes: (details) => dispatch(addNotes(details))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'classes'}
    ])
)(CreateNote);