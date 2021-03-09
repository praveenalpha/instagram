import axios from 'axios';
import React, { Component } from 'react';
import Post from '../posts/post';
import "./profile.css";
// const {uid} = require("../../secrets");
class Profile extends Component {
    state = { 
        user:{
            image:"",
            name:"",
            posts:[],
            bio:"",
            post_count:0,
            followerCount:0,
            follwingCount:0,
            
        },
        followers:[],
        followings:[],
        viewSelected: "post"
     }
     componentDidMount(){
        //  console.log("in")
        let uid = this.props.uid;
        let Name="";
        let pimage="";
        let Bio="";
        let Posts=[];
        let postCount=0;
        let followerCount=0;
        let followingCount=4;
        let followers = [];
        let Followings = [];
         axios.get(`/api/user/${uid}`).then( (user)=> {
            // console.log(user.data.data[0]);
             Name = user.data.data[0].user_name;
             pimage = user.data.data[0].pimage;
             Bio = user.data.data[0].bio;
            return axios.get(`/api/post/profile/${uid}`);
         }).then( obj => {
             Posts = obj.data.data;
             Posts.sort((a,b)=>{
                return new Date(b.created_on) - new Date(a.created_on);
              })
             for(let i=0;i<Posts.length;i++){
                 Posts[i]["user_name"] = Name;
                 Posts[i]["pimage"] = pimage;
                 
             }
             postCount=Posts.length;
             return axios.get(`api/request/showAllFollowers/${uid}`)
        }).then( (obj => {
            console.log("followers :", obj.data.data);
            followers = obj.data.data;
            followerCount = followers.length;
            return axios.get(`api/request/getAllFollowings/${uid}`).then( (obj =>{
                Followings = obj.data.data;
                console.log(Followings);
                followingCount = Followings.length;
                this.setState({
                    user:{
                        name:Name,
                        image:pimage,
                        bio:Bio,
                        posts:Posts,
                        postCount:postCount,
                        followerCount: followerCount,
                        followingCount: followingCount
                    },
                    followers:followers,
                    followings:Followings
                })
            }))
        }))
     }
     viewHandler = (view) => {
        if(view !== this.state.viewSelected){
            this.setState({
                viewSelected: view
            })
        }
     }
    render() { 
        return ( 
                <div className="my-profile-page">
                    <div className="my-profile">
                        <div className="my-profile-page-photo">
                            <img src={this.state.user.image} alt=""/>
                        </div>
                        <div className="my-profile-page-details">
                            <div className="my-profile-page-details-name">
                                <h1>{this.state.user.name}</h1>
                            </div>
                            <div className="my-profile-page-details-stats">
                                <div className="my-profile-page-details-posts-count" onClick={() => this.viewHandler("post")}>
                                    <h2>posts</h2>
                                    <h2>{this.state.user.postCount}</h2>
                                </div>
                                <div className="my-profile-page-details-follower-count" onClick={() => this.viewHandler("follower")}>
                                    <h2>follower</h2>
                                    <h2>{this.state.user.followerCount}</h2>
                                </div>
                                <div className="my-profile-page-details-following-count" onClick={() => this.viewHandler("following")}>
                                    <h2>following</h2>
                                    <h2>{this.state.user.followingCount}</h2>
                                </div>
                            </div>
                            <div className="bio">
                                <h2>{this.state.user.bio}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="my-profile-page-container">
                        {this.state.viewSelected === "post" && <div className="my-profile-page-post">
                                <div className="my-profile-page-post-name">POSTS</div>
                                <hr/>
                                <div className="my-profile-page-post-div">
                                    {this.state.user.posts.map(pic =>{
                                        pic["isProfile"] = true;
                                        return <Post key={pic.p_id} user={pic}></Post>
                                    })}
                                </div>
                        </div>}
                        {this.state.viewSelected === "follower" && <div className="my-profile-page-follower">
                                    <div className="my-profile-page-follower-name">FOLLOWER</div>
                                    <hr/>
                                    <div className="my-profile-page-follower-div">
                                        {this.state.followers.map( (follower) => {
                                            return (
                                                <div className="my-profile-page-follower-div-follower">
                                                    <div className="my-profile-page-follower-div-follower-img">
                                                        <img src={follower.pimage} alt="img.png"/>
                                                    </div>
                                                    <div className="my-profile-page-follower-div-follower-name">{follower.user_name}</div>
                                                    <div className="my-profile-page-follower-div-follower-btn">
                                                        <button>unfollow</button>
                                                    </div>
                                                </div>
                                            )
                                         })} 
                                    </div>
                            </div>}
                        {this.state.viewSelected === "following" && <div className="my-profile-page-following">
                                <div className="my-profile-page-following-name">FOLLOWING</div>
                                <hr/>
                                <div className="my-profile-page-following-div">
                                        {this.state.followings.map( (following) => {
                                            return (
                                                <div key = {following.user_name} className="my-profile-page-following-div-following">
                                                    <div className="my-profile-page-following-div-following-img">
                                                        <img src={following.pimage} alt="img.png"/>
                                                    </div>
                                                    <div className="my-profile-page-following-div-following-name">
                                                        <div className="my-profile-page-following-div-following-name-inner">
                                                            {following.user_name}</div>
                                                    </div>
                                                    <div className="my-profile-page-follower-div-follower-btn">
                                                        <button>unfollow</button>
                                                    </div>
                                                </div>
                                            )
                                         })} 
                                    </div>
                            </div>}
                    </div>

                </div>
         );
    }
}
 
export default Profile;
<h1>i am profile</h1>