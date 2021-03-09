import React, { Component } from 'react';
import "./login.css";
class Login extends Component {
    state = {}
    render() {
        return (
            <div className="login-body">

                <div className="login">
                    <div className="login-image">
                        <img src="/photos/login.jpg" alt="img"></img>

                    </div>
                    <div className="login-content">
                        <img src="/photos/logo1.png" alt=""/>
                        <h1>log in</h1>
                        <button onClick={this.props.login}><i class="fa fa-google-plus" aria-hidden="true"></i>         log in with google+</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;