const express = require("express")
const bodyPardser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyPardser.json());
app.use(cors());
const posts = {}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post("/events",(req,res)=>{
    const {type,data} = req.body
    if(type ==='postCreated'){
        const{id,title} = data;
        posts[id] = {id,title,comments:[]}
    }
    if(type === 'commentCreated'){
        const {id,content,postId} = data;
        const post = posts[postId];
        post.comments.push({id,content})

    }
    else{console.log("unknown Type!!!!!!!")}
    console.log(posts)
    res.send({})
})

app.listen(4002,()=>{
    console.log("listeneing on 4002 query ")
})