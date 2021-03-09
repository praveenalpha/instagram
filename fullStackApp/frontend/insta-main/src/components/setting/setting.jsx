import React, { Component } from 'react';
import "./setting.css"
import axios from "axios";
// const {uid} = require("../../secrets");


class Setting extends Component {
    state = { 
        user:{
            name:"",
            Password:"",
            email:"",
            bio:"",
            image:""
        },
        isDisabled:true
     }
     componentDidMount(){
         let uid = this.props.uid;
         axios.get(`/api/user/${uid}`).then( (user) =>{
            let name = user.data.data[0].user_name;
            let bio = user.data.data[0].bio;
            let Password = user.data.data[0].pw;
            let email = user.data.data[0].email;
            let pimage = user.data.data[0].pimage;
            // console.log(name);
            this.setState({
                user:{
                    name:name,
                    Password:Password,
                    bio:bio,
                    email:email,
                    image:pimage
                },
                isDisabled : true
            })
         })
     }
     setDisabledFlase = (e) => {
        e.preventDefault();
        this.setState({
            isDisabled : false
        })
     }
     fileInput = React.createRef();
     onCancelHandler = (e) => {
         e.preventDefault();
         this.componentDidMount();
     }
     onSaveHandler = (e) => {
        //  console.log(this.fileInput.current);
        let uid = this.props.uid;
         console.log(this.fileInput.current.files[0]);
         let userForm = new FormData();
         if(this.fileInput.current.files.length){
             let userImage = this.fileInput.current.files[0];
             userForm.append("pimage", userImage);
         }
         userForm.append('user_name', this.state.user.name);
         userForm.append('email', this.state.user.email);
         userForm.append('pw', this.state.user.Password);
         userForm.append('bio', this.state.user.bio);
          console.log(userForm);
         axios.patch(`/api/user/${uid}`, userForm).then( response =>{
            this.componentDidMount();
            
         });
     }
     onChangeHandler = (e) => {
         e.preventDefault();
         let key = e.target.id;
         let user = this.state.user;
         user[key] = e.target.value;
         this.setState({
             user:user
         })
     }
    render() { 
        return ( 
            <div className="profile-view">
                <div className="profile-image">
                    <img src={this.state.user.image} alt=""/>
                    { !this.state.isDisabled  && <input  type="file" ref = {this.fileInput}/>}
                </div>
                <div className="profile-details">
                    <div className="profile-details-container">
                        <div className="profile-details-containerIn">
                            <h3>Name</h3>
                            <input id="name" disabled={this.state.isDisabled} value={this.state.user.name} type="text" onChange={ (e) => {this.onChangeHandler(e)} }/>
                        </div>
                        <div className="profile-details-containerIn">
                            <h3>Email</h3>
                            <input id="email" disabled={this.state.isDisabled} type="text" value={this.state.user.email} onChange={ (e) => {this.onChangeHandler(e)} }/>
                        </div>
                        <div className="profile-details-containerIn">
                            <h3>Password</h3>
                            <input id="Password" disabled={this.state.isDisabled} type="text" value={this.state.user.Password} onChange={ (e) => {this.onChangeHandler(e)} }/>
                        </div>
                        <div className="profile-details-containerIn">
                            <h3>Bio</h3>
                            <input id="bio" disabled={this.state.isDisabled} type="text" value={this.state.user.bio} onChange={ (e) => {this.onChangeHandler(e)} }/>
                        </div>
                    </div>
                    <div className="button">{this.state.isDisabled ? 
                    <button className = "btn" onClick={this.setDisabledFlase}>EDIT</button> : 
                    <React.Fragment>
                        <button className = "btn" onClick = {this.onCancelHandler}>cancel</button>
                        <button className = "btn" onClick = {this.onSaveHandler}>save</button> 
                    </React.Fragment>}
                    </div>
                </div>

                
                
            </div>
         );
    }
}
 
export default Setting;