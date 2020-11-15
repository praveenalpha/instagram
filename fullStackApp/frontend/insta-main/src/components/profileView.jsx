import React, { Component } from 'react';
import Profile from './profile';
import ProfileList from './profileList';
class ProfileView extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="profile-view">
                <Profile />
                <ProfileList />
            </div>    
        );
    }
}
 
export default ProfileView;