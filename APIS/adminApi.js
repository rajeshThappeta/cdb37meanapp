//create mini express app
const exp=require("express");
const adminApiObj=exp.Router();


//get req handler
adminApiObj.get("/getadmins", (req,res,next)=>{

    res.send("i am working from admin api")
})


//export
module.exports=adminApiObj;