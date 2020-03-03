import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import logo from './spt-logo.jpeg';

const Navbar = (props) => {

    const {auth} = props;
    const links = auth.uid ? <SignedInLinks/> : null;

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo"><img src={logo} style={{height:"8.4vh"}}/></Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Navbar);