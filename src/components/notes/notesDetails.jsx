import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';

class NotesDetails extends React.Component{

    handlePdfDelete=(name,sub, topic)=>{
        var plist = {}, tlist={},count=0;
        firebase.firestore().collection('notes').where('class','==',this.props.item).get()
        .then(snap=>{
            snap.forEach(doc=>{
                if (sub===doc.data().subject) {
                    plist = doc.data().pdflist;
                    tlist = doc.data().Topic;
                    plist = plist.filter( el => el.name !== name );
                    tlist = tlist.filter( el => el !== topic );
                    console.log(plist);
                    plist.map(item=>{
                        if(item.Topic===topic)
                        {
                            count++;
                        }
                    })
                    if(count>0){
                        firebase.firestore().collection('notes').doc(doc.id).update({
                            pdflist : plist
                        })
                    }
                    else{
                        firebase.firestore().collection('notes').doc(doc.id).update({
                            pdflist : plist,
                            Topic: tlist
                        })
                    }
                }
            })
        })
    }

    render() {

        const { item, notesList } = this.props;
        return(
            <div className="class-notes-list-section">
                <div className="class-notes-heading">
                    <h1>List Of Notes For Class <span>{item}</span></h1>
                </div>   
                <div className="class-notes-list">
                    { notesList && notesList.map((notes)=>(
                        <>
                        <h3>{notes.subject}</h3>
                        <table>
                            
                            <thead>
                                <tr>
                                    <th style={{width:"33%", textAlign:"center"}}>TOPICS</th>
                                    <th style={{width:"33%", textAlign:"center"}}>PDF NAME</th>
                                    <th style={{width:"33%", textAlign:"center"}}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.pdflist && notes.pdflist.map((pdfItem) => (
                                    <tr>
                                        <td style={{width:"33%", textAlign:"center"}}>{pdfItem.Topic}</td>
                                        <td style={{width:"33%", textAlign:"center"}}>{pdfItem.name}</td>
                                        <td style={{width:"33%", textAlign:"center"}}>
                                            <a href={pdfItem.pdflink} target="_blank">
                                                <button class="waves-effect waves-light btn-small" style={{marginRight:"5px"}}><i class="material-icons">remove_red_eye</i></button>
                                            </a>
                                            <button class="waves-effect waves-light btn-small red"><i class="material-icons" onClick={()=>this.handlePdfDelete(pdfItem.name,notes.subject, pdfItem.Topic)}>clear</i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <div style={{margin:"1.5rem"}}></div>
                        </table>
                        </>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const item = ownProps.match.params.item;
    const notesList = state.firestore.ordered.notes;
    return{
        item: item,
        notesList: notesList
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        if(props){
            console.log(props.item);
            return [
                { collection: 'notes', where: ['class', '==', props.item] },
            ]
        }
    })
)(NotesDetails);