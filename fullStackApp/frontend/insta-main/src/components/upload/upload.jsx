import React, { Component } from 'react';
import "./upload.css";
// import {uid} from "../../secrets";
import axios from 'axios';
import { Link } from 'react-router-dom';
class Upload extends Component {
    state = {
        caption:""
     }
     fileInput = React.createRef();
     onChangeHandler = (e)=>{
        console.log(e.target.value);
        this.setState({
            caption:e.target.value
        })
     }
     onSaveHandler = () =>{
         let uid = this.props.uid;
         let formData = new FormData();
         formData.append("caption", this.state.caption);
         if(this.fileInput.current.files[0]){
             formData.append("post_image", this.fileInput.current.files[0]);
             axios.post(`/api/post/${uid}`, formData).then( (obj) =>{
            })
         }
     }
    render() { 
        return ( 
        <div className="upload-body">
            <div className="upload">
                <div className="upload-photo">
                    <input type="file" ref = {this.fileInput}/>
                </div>
                <div className="upload-caption">
                    <input value = {this.state.caption} type="text" placeholder="write your caption here" onChange={(e) => this.onChangeHandler(e)} />
                </div>
            </div>
                <div className="upload-btn"  onClick = {this.onSaveHandler}>
                    <Link to = "/">
                        <button>CREATE POST</button>
                    </Link>
                </div>
        </div>
        )
    }
}
 
export default Upload;