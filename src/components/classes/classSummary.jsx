import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {deleteClass} from '../../store/actions/classActions';

class ClassSummary extends React.Component {

    handleDelete = (id) => {
        this.props.deleteClass(id);
    }
    
    render() {
    const {item} = this.props;
    return (
        <div className="class-card">
            
            <h5>Class</h5>
            <h1>{item.class}</h1>
            <div className="class-card-action-buttons">
                <Link to={'./classList/class-'+item.class}>
                    <button class="btn-floating btn-small waves-effect waves-light" style={{marginRight:"5px"}}><i class="material-icons">remove_red_eye</i></button>
                </Link>
                <button class="btn-floating btn-small waves-effect waves-light red" onClick={()=>this.handleDelete(item.id)}><i class="material-icons">clear</i></button>
            </div>
        </div>
    )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteClass : (id) => dispatch(deleteClass(id))
    }
}

export default compose(
    connect(null, mapDispatchToProps)
)(ClassSummary);