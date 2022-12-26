const mongoose=require("mongoose")



const todoSchema=mongoose.Schema({
taskname:String,
status:String,
tag:String,
userID:String

})
var Todomodel=mongoose.model("todolist",todoSchema)

module.exports={
    Todomodel
}