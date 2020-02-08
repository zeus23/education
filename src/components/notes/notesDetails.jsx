import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';

class NotesDetails extends React.Component{
    render() {
        return(
            <div className="class-notes-list-section">
                <div className="class-notes-heading">
                    <h1>List Of Notes</h1>
                </div>   
                <div className="class-notes-list">
                    <table>
                        <thead>
                            <tr>
                                <th>CLASS</th>
                                <th>SUBJECT</th>
                                <th>TOPICS</th>
                                <th>PDF NAME</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

export default NotesDetails;