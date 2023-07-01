import React from "react";
import Postcreate from "./Postcreate";
import PostList from "./PostList";

export default ()=>{
    return(<div className="container">
        <h1>Create Post</h1>
        <Postcreate/>
        <hr />
        <h1>Posts</h1>
        <PostList/>
    </div>)
}