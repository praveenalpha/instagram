import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import React, { Component } from 'react';
import Feeds from './components/feeds/Feeds';
import NavBar from "./components/navbar/navbar";
import ProfileView from "./components/profileView/profileView";
import Setting from "./components/setting/setting";
import Profile from "./components/profile/profile";
import Upload from "./components/upload/upload";
import Follow from "./components/follow/follow";
import Login from "./components/login/login";
import "./App.css";
import axios from "axios";
class App extends Component {
  state = {
    isAuth: false,
    uid:null,
    search: "",
    user:{
      user_name:"",
      p_image:""
    }
  }
  searchUser = (word) => {
    this.setState({
      search: word
    })
  }
  login = () =>{
    // this.setState({
    //   isAuth: true
    // })
    window.location = "/auth/google";
  }
  logout = () => {
    this.setState({
      isAuth: false,
      uid:null
    })
  }
  
  componentDidMount(){
    axios.get("/auth/checkAuth").then( obj =>{
      let isAuth = obj.data.isAuth;
      let uid = obj.data.user.uid;
      console.log(isAuth);
      console.log(uid);
      this.setState({
        isAuth: isAuth,
        uid:uid
      })
    }).catch( err =>{
      console.log(err);
    })
  }
  getUser = (user_name, p_image)=>{
    this.setState({
      user:{
        user_name:user_name,
        p_image: p_image
      }
    })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar searchUser = {this.searchUser} isAuth={this.state.isAuth} logout = {this.logout} />

          <Route path="/" exact>
            {this.state.isAuth ? <div className="content">
              <Feeds uid = {this.state.uid} user = {this.state.user} />
              <ProfileView uid = {this.state.uid} getUser = {this.getUser} />
            </div> : <Redirect to = "/login" />}
          </Route>

          <Route path="/follow" exact>
            {this.state.isAuth ? <Follow  word={this.state.search} uid = {this.state.uid} /> : <Redirect to = "/login" />}
          </Route>

          <Route path="/uploadPost" exact>
            {this.state.isAuth ? <Upload  uid = {this.state.uid} /> : <Redirect to = "/login" /> }
          </Route>

          <Route path="/profile" exact>
            {this.state.isAuth ? <Profile uid = {this.state.uid}  /> : <Redirect to = "/login" /> }
          </Route>

          <Route path="/setting" exact>
            {this.state.isAuth ? <Setting  uid = {this.state.uid} /> : <Redirect to = "/login" /> }
          </Route>
          
          <Route path = "/login" exact>
            {this.state.isAuth ? <Redirect to = "/" /> : <Login login = {this.login} />}
          </Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
