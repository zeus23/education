import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to="/teacherlist">TEACHERS</NavLink></li>
            <li><NavLink to="/studentList">STUDENTS</NavLink></li>
            <li><NavLink to="/classList">CLASSES</NavLink></li>
            <li><NavLink to="/notesList">NOTES</NavLink></li>
            <li><a href="/signin" onClick = {props.signOut}>LOG OUT</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(SignedInLinks);