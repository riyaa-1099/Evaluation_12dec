const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];

try{
    const decoded=jwt.verify(token,'hush')
if(decoded){
const userID=decoded.userID
req.body.userID=userID;
next()
}
}
catch(err){
    console.log(err)
    res.send({"msg":"incorrect token"})
}
// else{
//     res.send({"msg":"incorrect token"})
// }

// else{
//     res.send({"msg":"not found token, please login"})

// }
}
module.exports={authentication}