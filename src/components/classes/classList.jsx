import React from 'react';
import ClassSummary from './classSummary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import './classes.style.css';

class ClassList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            classList : []
        }
    }
   render () {
        const { x } = this.props;
        var i = [];
        x && x.map( classItem => {
            i.push(classItem);
        }
    )
        return (
            <div className="class-list-section">
                <div>
                    <a href="/createClass" target="_blank" class="btn-floating btn-large waves-effect waves-light black" style={{margin:"1rem"}}><i class="material-icons">add</i></a>
                </div>
                <h3>Class List</h3>
                <div className="class-container">
                    {i && i.map(item =>(
                        
                        <ClassSummary item={item}/>
                           
                    ))}   
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'classes'}
    ])
)(ClassList);