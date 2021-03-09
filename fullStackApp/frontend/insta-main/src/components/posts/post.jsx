import axios from 'axios';
import React, { Component } from 'react';
// import photo from "./itachi.jpg"
import "./post.css";
class Post extends Component {
    state = {
        isProfile: this.props.user.isProfile,
        profileImage: this.props.user.pimage,
        userName: this.props.user.user_name,
        photo: this.props.user.post_image,
        likes: 0,
        cmnt:0,
        comments: this.props.user.comments,
        comment: this.props.user.caption,
        p_id: this.props.user.p_id,
        my_comment:"",
        my_comments: []
    }
    onChangeHandler = (e)=>{
        console.log(e.target.value);
        this.setState({
            my_comment: e.target.value
        })
    }
    onClickHandler = (e) => {
        let onPostHandler = this.props.onPostHandler;
        onPostHandler(this.state.my_comment, this.state.p_id);
    }
    componentDidMount(){
        let object;
        let object2;
        axios.get(`/api/like/${this.state.p_id}`).then( (obj) =>{
            object = obj;
            console.log(object.data.data.length)
            return axios.get(`/api/comment/${this.state.p_id}`);
            }).then( obj2=>{
                object2 = obj2;
                if(object.data.data){
                    console.log("inside post and like count is : ", object.data.data.length);
                    this.setState({
                        likes: object.data.data.length,
                        my_comments: object2.data.data,
                        cmnt: object2.data.data.length
                    })
                }
        })
    }
    render() {
        return (<React.Fragment>
            {
                this.state.isProfile === true ? <div className="post-profile">
                <div className="post-container-profile">
                    <div className="post-head-profile">
                        <div className="post-head-profile-img-profile">
                            <img src={this.state.profileImage} alt="ppimg" />
                        </div>
                        <div className="post-head-user-name-profile"><h3>{this.state.userName}</h3></div>
                    </div>
                    <div className="post-image-profile">
                        <img src={this.state.photo} alt="post" />
                    </div>
                    <div className="post-body-profile">
                        <div className="post-body-like-profile">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            <i class="fa fa-comment-o" aria-hidden="true"></i>
                        </div>
                        <div className="like-count-profile">
                            {this.state.likes}likes<br />
                            {this.state.comments}comments<br />
                            {this.state.comment}
                        </div>
                        <div className="post-body-comment-profile">
                            <input type="text-profile" placeholder="comment" />
                            <button>post</button>
                        </div>
                    </div>
                </div>
            </div> : <div id={this.state.p_id} className="post">
                    <div className="post-container">
                        <div className="post-head">
                            <div className="post-head-profile-img">
                                <img src={this.state.profileImage} alt="ppimg" />
                            </div>
                            <div className="post-head-user-name"><h3>{this.state.userName}</h3></div>
                        </div>
                        <div className="post-image">
                            <img src={this.state.photo} alt="post" />
                        </div>
                        <div className="post-body">
                            <div className="post-body-like">
                                <i class="fa fa-heart-o" aria-hidden="true" onClick = {() => this.props.likeHandler(this.state.p_id)}></i>
                                <i class="fa fa-comment-o" aria-hidden="true"></i>
                            </div>
                            <div className="like-count">
                                {this.state.likes}likes<br />
                                {this.state.cmnt}comments<br />
                                <span className = "like-count-span">{this.state.comment}</span>
                            </div>
                            <div className="post-body-comment">
                                <input value = {this.state.my_comment} onChange = {(e) => this.onChangeHandler(e)} type="text" placeholder="comment" />
                                <button onClick = { (e) => this.onClickHandler(e)}>post</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
        );
    }
}

export default Post;