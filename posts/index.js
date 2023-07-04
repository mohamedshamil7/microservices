const express  = require("express")
const {randomBytes} = require("crypto")
const bodyparser = require("body-parser")
const cors = require("cors")
const axios = require("axios")


const app = express()
app.use(bodyparser.json())
app.use(cors());
const posts = {} 


app.get('/posts',(req,res)=>{
    res.send(posts)
});
app.post('/posts',async(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title}= req.body
    posts[id]= {
        id,title
    };
   await axios.post("http://event-bus-srv:4005/events",{
        type:"postCreated",
        data:{
            id,title
        }
    })

    res.status(201).send(posts[id])
})

app.post("/events",(req,res)=>{
    console.log("receved an event")
    console.log(req.body)
    res.send({})
})


app.listen(4000,()=>{
    console.log("version v 40")
    console.log("listening on port 4000")
})