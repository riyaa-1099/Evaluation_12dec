const express=require("express")
const todoRouter=express.Router();

const {Todomodel}=require("../models/todo.model")

todoRouter.get("/",async(req,res)=>{
    const todowe=await Todomodel.find()
    res.send({"Notes":todowe})
})

todoRouter.post("/post",async(req,res)=>{
const payload=req.body;
try{
    const new_todo=new Todomodel(payload);
    await new_todo.save();
    res.send({"msg":"Todo Created successfully"})
}
catch(err){
    console.log(err)
    res.send({"msg":"something wrong!!"})
}
})



todoRouter.patch("/patch/:todoID",async(req,res)=>{
const todoID=req.params.todoID;
const payload=req.body;
const userID=req.body.userID;
console.log(userID)
const todom=await Todomodel.findOne({_id:todoID})
console.log(todom)
if(userID!==todom.userID){
    res.send({"msg":"Not authorised!!"}) 
}
else{

    await Todomodel.findByIdAndUpdate({_id:todoID},payload)
    res.send({"msg":"Todo updated successfully!!"}) 
}
})

todoRouter.delete("/delete/:todoID",async(req,res)=>{
    const todoID=req.params.todoID;
    const userID=req.body.userID;
    const todo=await Todomodel.findOne({_id:todoID})
if(userID!==todo.userID){
    res.send({"msg":"Not authorised!!"}) 
}
else{
    
    await Todomodel.findByIdAndDelete({_id:todoID})
    res.send({"msg":"Todo deleted successfully!!"}) 
}
})

module.exports={
    todoRouter
}