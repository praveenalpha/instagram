import React, { Component } from 'react';
import "./profile.css";
class Profile extends Component {
    state = { 
        name: "tets name",
        handle : "test handle",
        bio: "test bio",
        pImage: "hair.png",
        postCount: 10,
        followerCount: 100,
        followingCount: 100,
        requestCount: 5
     }

    componentDidMount(){
        //api data fetch
    }
    
    render() { 
        let {name, handle , bio, pImage, postCount, followerCount, followingCount, requestCount} = this.state;
        return ( 
            
            <div className="profile">
                <div className="profile-details">
                    <div className="profile-image">
                        <img src={pImage} alt="profile.png"/>
                    </div>
                    <div className="profile-name">{name}</div>
                    <div className="profile-handle">{handle}</div>
                    <div className="profile-bio">{bio}</div>
                </div>
                <div className="profile-stats">
                    <div className="postCount">POSTCOUNT {postCount}</div>
                    <div className="followerCount">FOLLOWER COUNT {followerCount}</div>
                    <div className="followingCount">FOLLOWING COUNT {followingCount}</div>
                </div>

                <div className="profile-info">
                    <div className="suggestions">SUGGESTIONS</div>
                    <div className="request">REQUEST</div>
                    <div className="follwer">FOLLOWER</div>
                    <div className="following">FOLLOWING</div>
                </div>
                
            </div>
        
        );
    }
}
 
export default Profile;