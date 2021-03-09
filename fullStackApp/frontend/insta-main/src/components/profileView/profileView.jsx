import React, { Component } from 'react';
import axios from "axios";
import "./profileView.css";
// const {uid} = require("../../secrets");


class ProfileView extends Component {
    state = { 
        user:{
            pimage:"",
            name:""
        },
        suggestion:[]
     }
     componentDidMount(){
         let pimage = "";
         let name = "";
         let suggestion = [];
         let uid = this.props.uid;
        //  console.log(uid);
         axios.get(`/api/user/params/${uid}`).then( (obj) =>{
            //  console.log(obj);
             pimage = obj.data.data[0].pimage;
             name = obj.data.data[0].user_name;
             let getUser = this.props.getUser;
             getUser(name, pimage);
             return axios.get(`/api/request/sendRequest/${uid}`).then( (obj) =>{
                 console.log("suggetions : ", obj.data);
                suggestion = obj.data.data;
                this.setState({
                    user:{
                        pimage: pimage,
                        name : name
                    },
                    suggestion:suggestion
                })
            })
         })
     }
     onFollowHandler = (suggestion)=>{
        console.log(suggestion);
     }
    render() {
        return ( 
            <React.Fragment>
                <div className="profileView">
                    <div className="user-profile">
                        <div className="profileDP">
                            <img src={this.state.user.pimage} alt="img"/>
                        </div>
                        <div className="profileName"><h3>{this.state.user.name}</h3></div>
                    </div>
                    <div className="suggestions">
                        {this.state.suggestion.map( (suggetion) => {
                            return (<div className="suggestion-profile" key = {suggetion.user_name}>
                                 {console.log(`${suggetion.uid}`)}
                                <div className="suggetionProfileDP">
                                    <img src={suggetion.pimage} alt="img"/>
                                </div>
                                <div className="suggetionProfileName"><h3>{suggetion.user_name}</h3></div>
                                <div className="follow" onClick = {() => this.onFollowHandler(`${suggetion.uid}`)}> 
                                    <button>follow</button>
                                </div>
                            </div>       )
                        })}
                    </div>
                </div>

            </React.Fragment>
         );
    }
}
 
export default ProfileView;