const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
name:String,
email:String,
password:String,
ip_address:String

})
const Usermodel=mongoose.model("todouser",userSchema)

module.exports={
    Usermodel
}