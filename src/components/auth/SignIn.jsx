import React from 'react';
import admin from './assets/man.png';
import pwd from './assets/password.png';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component{

    state = {
        email:'',
        password:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {

        const { auth, authError } = this.props;
        if(auth.uid) return  <Redirect to="/"/>

        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h2 className="text-darken-3">Welcome Admin,</h2>
                    <h3 className="green-text text-darken-3">login to continue</h3>
                    <div className="input-field">
                        <label htmlFor="email"><img src={admin} alt="admin-logo"/>Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password"><img src={pwd} alt="admin-logo"/>Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <p className="grey-text text-darken-3">forgot password ?? Reset</p>
                    <div className="input-field">
                        <button className="btn green z-depth-0">Get Started <i className="fas fa-long-arrow-alt-right" style={{transform: "translateY(1px)"}}></i></button>
                        <div className="red-text">
                            { authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);