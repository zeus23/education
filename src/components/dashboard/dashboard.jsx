import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashCard from './dashCards';

class Dashboard extends React.Component{
    render() {

    const {auth} = this.props;
    if (!auth.uid) return <Redirect to="/signIn"/>
        return (
            <div className="dashboard-container">
               <DashCard item = {20} title = {'Teachers'} /> 
               <DashCard item = {100} title = {'Students'}/> 
            </div>
        )
    }
}

 const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

 export default connect(mapStateToProps)(Dashboard);