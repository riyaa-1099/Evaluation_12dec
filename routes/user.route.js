const express=require("express")
const userRouter=express.Router();

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const {Usermodel}=require("../models/user.model")

userRouter.post("/signup",async (req,res)=>{
const {email,password,name}=req.body;
const user=await Usermodel.find({email})
if(user.length>=1){
    res.send({"msg":"Sorry, user already exist"})
}
else{
try{
bcrypt.hash(password,4,async function(err,hash){
    const current=new Usermodel({email,password:hash,name,ip_address:req.socket.remoteAddress})
await current.save()
res.send({"msg":"Sign-up Successfull"})
})
}
catch(err){
console.log(err)
console.log({"msg":"Something went wrong"})
}
}
})


userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
    const user=await Usermodel.find({email})
    if(user.length>0){
       const hashed_pass=user[0].password;
       bcrypt.compare(password,hashed_pass,function(err,result){
        if(result){
       const token= jwt.sign({"userID": user[0]._id}, 'hush');
        res.send({"msg":"Login Successfull","token":token})
        }
        else{
            res.send({"msg":"wrong password"})
        }
       })
    }
    else{   
    res.send({"msg":"User not found"}) 
    }
}
    catch(err){
    console.log(err)
    console.log({"msg":"Something went wrong"})
    }
    })

    module.exports={
        userRouter
    }
