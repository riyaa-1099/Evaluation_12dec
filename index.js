const express=require("express")
const cors=require('cors')

const app=express();
app.use(express.json())

app.use(cors())
const {authentication}=require("./middleware/auth")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {todoRouter}=require("./routes/todo.route")



app.get("/",(req,res)=>{
    res.send({"msg":"Welcome"})
})

app.use("/user",userRouter)

app.use(authentication)

app.use("/todo",todoRouter)

app.listen(7500,async()=>{
try{
await connection;
console.log("Connected to db successfully")
console.log("Listening on port 7500")
}
catch(err){
    console.log(err)
    console.log("Connection failed to db")
}

})