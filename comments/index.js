const express  = require("express")
const {randomBytes} = require("crypto")
const bodyparser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyparser.json())
app.use(cors());
const commentsByPostId = {} ;


app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id]||[])
});

app.post('/posts/:id/comments',async(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] ||[]
    comments.push({id:commentId,content})
    commentsByPostId[req.params.id]= comments

    await axios.post("http://localhost:4005/events",{
        type:"commentCreated",
        data:{
            id:commentId,content,postId:req.params.id
        }
    })
    res.status(201).send(commentsByPostId)
    

})
app.post("/events",(req,res)=>{
    console.log("receved an event")
    console.log(req.body.type)
    res.send({})
})

app.listen(4001,()=>{
    console.log("listening on port 4001 comments")
})