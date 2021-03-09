import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./navBar.css"
class NavBar extends Component {
    state = {
        search:""
    }
    onChangeHandler = (e) =>{
        // console.log(e.target.value);
        this.setState({
            search: e.target.value
        })
    }
    onSaveHandler = () =>{
        if(this.state.search){
            let searchUser = this.props.searchUser;
            // console.log(this.props.searchUser);
            let word = this.state.search;
            searchUser(word);
            this.setState({
                search: ""
            })
            // console.log(word);
        }
    }
    render() { 
        return ( 
            <div className="nav">
                <div className="navLogo">
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="img"/>
                    </Link>
                </div>
                {this.props.isAuth ?<React.Fragment> 
                        <div className="navSearch">
                        <input value = {this.state.search} type="text" placeholder = "🔎search" onChange = {(e) => this.onChangeHandler(e)}/>
                   
                        <Link to = "/follow">
                            <button onClick = {() => this.onSaveHandler()}>search</button>
                        </Link>
                    </div>
                <div className="navIcons">
                    <div className="nav-home emoji">
                        <Link to="/">
                        🏠
                        </Link>
                    </div>
                    <div className="nav-upload emoji">
                        <Link to="/uploadPost">
                        📁
                        </Link>
                    </div>
                    <div className="nav-profile emoji">
                        <Link to="/profile">
                        👤
                        </Link>
                    </div>
                    <div className="nav-setting emoji">
                        <Link to="/setting">
                        ⚙️
                        </Link>
                    </div>
                    <Link to="/login">
                        <div className="nav-logout emoji" onClick={this.props.logout}>
                        📴
                        </div>
                    </Link>
                </div>
                </React.Fragment> : 
                <h2>Please Login Below !</h2>}
                
            </div>
         );
    }
}
 
export default NavBar;