import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './notes.style.css';

class ClassSummary extends React.Component {
    
    render() {
    const {item} = this.props;
    return (
        <div className="notes-card">
            
            <h5>Class Notes</h5>
            <h1>{item.class}</h1>
            <div className="notes-card-action-buttons">
                <Link to={'./notesList/notes-'+item.class}>
                    <button class="btn-small" style={{marginRight:"5px"}}>view</button>
                </Link>  
            </div>
        </div>
    )
    }
}

export default compose(
    connect(null)
)(ClassSummary);