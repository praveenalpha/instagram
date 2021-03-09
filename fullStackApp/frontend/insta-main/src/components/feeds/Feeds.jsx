import axios from 'axios';
import React, { Component } from 'react';
import Post from "../posts/post";
import "./feeds.css";
class Feeds extends Component {
  state = {
    posts: [],
    user:{
      user_name:"",
      p_image:""
    }
  }
  
  componentDidMount(){
    let posts = [];
    axios.get("/api/post").then ( (obj)=>{
      posts = obj.data.data;
      // console.log("pots :", obj.data.data);
      if(posts){

        posts.sort((a,b)=>{
          return new Date(b.created_on) - new Date(a.created_on);
        })
      }

      this.setState({
        posts: posts,
        user:{
          user_name: this.props.user.user_name,
          p_image: this.props.user.p_image
        }
      })
    })
  }
  likeHandler = (p_id)=>{
    let u_id = this.props.uid;
    axios.post(`/api/like/${p_id}`, {"u_id": u_id}).then( (obj) =>{
      console.log("added like and here is the obj : ", obj);
      this.componentDidMount();
      alert("you have liked a post !!");
    })
  }
  onPostHandler = (cmnt, pid)=>{
    let u_id = this.props.uid;
    axios.post(`/api/comment/${pid}`, {"u_id":u_id, "user_name": this.state.user.user_name, "pimage": this.state.user.p_image, "p_id": pid, "cmnt": cmnt}).then( obj =>{
      alert("comment added !!");
    }).catch(err=>{
      alert(err);
    })

  }
  render() {
    return (
      <div className="feeds">
        {this.state.posts.map((post) => {
          return <Post key={post.p_id} user={post} onPostHandler = {this.onPostHandler} likeHandler = {this.likeHandler} />;
        })}
      </div>
    );
  }
}

export default Feeds;