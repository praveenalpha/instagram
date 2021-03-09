import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./follow.css";
class Follow extends Component {
    state = { 
        foundUser: false,
        name: this.props.word,
        follow_id: null,
        pimage:"",
        bio:""
     }
     sendFollowRequest = ()=>{
         let uid = this.props.uid;
         let follow_id = this.state.follow_id;
        axios.post(`/api/request/sendRequest/${uid}`, {"follow_id":follow_id}).then(obj =>{
            console.log(obj)
            if(obj.data.number_of_tables === 1){
                alert( `${this.state.name} is a private account!!!! your request has been sent in pending requests`);
            }
            else if(obj.data.number_of_tables === 2){
                alert( `Request succesfully sent to ${this.state.name} !!`);
            }
        });
     }
     componentDidMount(){
         let name = this.props.word;
         axios.get(`/api/user/byName/${name}`).then( (obj) =>{
             console.log(obj.data.data.length);
             if(obj.data.data.length){
                 this.setState({
                     foundUser: true,
                     pimage : obj.data.data[0].pimage,
                     bio: obj.data.data[0].bio,
                     follow_id: obj.data.data[0].uid
                 })
             }
         } ).catch( error =>{
             console.log("error", error); 
            this.setState({
                foundUser: false
            })
         })
     }
    render() { 
        return ( 
            <div className="follow-container">
                {this.state.foundUser ? <React.Fragment>

                <div className="follow-header">
                    <div className="follow-header-img">
                        <img src={this.state.pimage} alt=""/>
                    </div>
                    <div className="follow-header-name">
                        <h1>{this.props.word}</h1>
                    </div>
                </div>
                <div className="follow-bio">
                    <h2>{this.state.bio}</h2>
                </div>
                <Link to = "/">
                    <div className="send-request" onClick = {this.sendFollowRequest}>
                        <button>follow</button>
                    </div>
                </Link>
                </React.Fragment> : <React.Fragment>
                    <h1>user not found!!</h1>
                    <Link to = "/">
                        <button>go back</button>

                    </Link>
                </React.Fragment>}
            </div>
        );
    }
}
 
export default Follow;